import { MdNotifications } from "react-icons/md";
import { useSocket } from "../../context/socketContext";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { formatDate } from "../../utils/dateUtils";
import { fetchData, updateData } from "../../api/apis";

const NotificationBell = () => {
    const { socket } = useSocket();
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [unread, setUnread] = useState(0);
    const dropdownRef = useRef();
    const limit = 30;

    const fetchNotifications = async (pageNumber = 1) => {
        try {
        const res = await fetchData(`/api/notifications?page=${pageNumber}&limit=${limit}`);
        if (res.success) {
            if (pageNumber === 1) {
                setNotifications(res.notifications);
            } else {
                setNotifications((prev) => [...prev, ...res.notifications]);
            }
            setUnread(res.unreadCount);
            setTotalPages(res.totalPages);
        }
        } catch (err) {
        console.error("Error fetching notifications:", err);
        }
    };

    const handleRead = async (notification) => {
        const path = notification.member_id ? '/admin/members' : '/admin/equipments'
        
        await updateData(`/api/notifications/${notification._id}`, {})

        window.location.href = path;
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on("receiveNotification", (newNotification) => {
            setUnread(prev => prev + 1);
            setNotifications((prev) => [newNotification, ...prev]);
        });
        return () => {
            socket.off('receiveNotification')
        }
    }, [socket]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNext = () => {
        if (page < totalPages) {
        const nextPage = page + 1;
        fetchNotifications(nextPage);
        setPage(nextPage);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
        <button
            onClick={() => setOpen(!open)}
            className="relative text-white bg-blue-500 p-3 rounded-full cursor-pointer hover:opacity-50"
        >
            <MdNotifications className="text-2xl" />
            {unread > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                {unread}
            </span>
            )}
        </button>

        {open && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-sm z-50">
            <div className="h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                <p className="p-6 text-center text-sm text-gray-400">No notifications</p>
                ) : (
                notifications.map((notification) => (
                    <div
                    key={notification._id}
                    onClick={() => handleRead(notification)}
                    className="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                    >
                    <div className="flex items-start gap-2">
                        {!notification.isRead && (
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        )}
                        <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm">{notification.title}</h3>
                        <p className="text-gray-600 text-xs mt-0.5">{notification.message}</p>
                        <span className="text-gray-400 text-[10px] mt-1 inline-block">
                            {formatDate(new Date(notification.createdAt))}
                        </span>
                        </div>
                    </div>
                    </div>
                ))
                )}
            </div>
            {page < totalPages && (
                <button
                onClick={handleNext}
                className="w-full py-2 text-sm text-blue-500 border-t border-gray-200 hover:bg-gray-100"
                >
                Load More
                </button>
            )}
            </div>
        )}
        </div>
    );
};

export default NotificationBell;
