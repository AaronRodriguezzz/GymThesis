import { useState, useMemo } from "react";
import AdminHeader from "../../components/ui/AdminHeader";
import { updateData } from "../../api/apis";
import { FaEdit, FaUserSlash, FaUserPlus } from "react-icons/fa";
import { ConfirmDialog } from "../../components/dialogs/CustomAlert";
import NewAdminModal from "../../components/modals/NewAdminModal";
import AdminUpdateModal from "../../components/modals/AdminUpdateModal";
import useFetch from "../../hooks/useFetch";

const Accounts = () => {
  const [search, setSearch] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [accountToUpdate, setAccountToUpdate] = useState(null);
  const [accountToDisable, setAccountToDisable] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { data } = useFetch('/api/admins')

  const filteredAccounts = useMemo(() => {
    if(!data?.admins) return [];
    return data?.admins.filter((acc) => {
    const searchLower = search.toLowerCase();
    return (
      acc.username?.toLowerCase().includes(searchLower) ||
      acc.role?.toLowerCase().includes(searchLower) ||
      acc.status?.toLowerCase().includes(searchLower)
    );
  });
  })

  const handleConfirm = async () => {
    try{
      const response = await updateData(`/api/admins/disable/${accountToDisable._id}`)

      if(response){
        setAccounts(prev => (
          prev.map(acc => acc._id === accountToDisable._id ? response.admin : acc)
        ))
        setShowConfirm(false);
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="h-screen w-full p-10">
      <AdminHeader
        title={"Admin Accounts"}
        description={"Manage administrator accounts: add, update, or disable users."}
      />

      <div className="h-[85%] rounded bg-white/50 shadow-md mt-4 p-4">
        {/* Search + Button */}
        <div className="flex w-full space-x-2 mb-4">
          <input
            type="text"
            className="flex-8 rounded bg-white shadow-lg px-4 py-2 text-black caret-blue-500 outline-0 placeholder:text-gray-400"
            placeholder="Search by username, role, or status..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => setShowNewModal(true)}
          >
            <FaUserPlus /> NEW ACCOUNT
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto overflow-x-auto custom-scrollbar rounded h-[90%] bg-white-800">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-blue-900 text-gray-100 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((acc) => (
                <tr
                  key={acc._id}
                  className="border-b border-gray-700/20 hover:bg-gray-200/50 text-black"
                >
                  <td className="px-6 py-3">{acc.fullname}</td>
                  <td className="px-6 py-3">{acc.email}</td>
                  <td className="px-6 py-3">{acc.role}</td>
                  <td
                    className={`px-6 py-3 font-bold ${
                      acc.status === "Active" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {acc.status}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          setShowUpdateModal(true);
                          setAccountToUpdate(acc);
                        }}
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50"
                        disabled={acc.status === 'Disabled'}
                        onClick={() => {
                          setShowConfirm(true);
                          setAccountToDisable(acc);
                          console.log(acc);
                        }}
                      >
                        <FaUserSlash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showNewModal && <NewAdminModal onClose={setShowNewModal} />}

      {showUpdateModal && (
        <AdminUpdateModal
          admin={accountToUpdate}
          onClose={setShowUpdateModal}
        />
      )}

      {showConfirm && (
        <ConfirmDialog
          title="Confirm Deletion"
          message={`Are you sure you want to delete ${accountToDisable?.fullname}?`}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default Accounts;
