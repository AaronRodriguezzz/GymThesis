const AdminHeader = ({ title,description }) => {
  return (
    <div className="flex items-center justify-between">
      {/* Left: Title & description */}
      <div>
        <h1 className="text-[30px] font-bold tracking-tighter text-blue-500">
          {title}
        </h1>
        <p className="text-gray-400 tracking-tight">{description}</p>
      </div>
    </div>
  );
};

export default AdminHeader;
