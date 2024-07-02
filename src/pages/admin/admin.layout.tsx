import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { useEffect } from "react";

const AdminLayout = () => {
  const isAdmin = localStorage.getItem("role");
  const navigate = useNavigate();
  const checkAdmin = () => {
    if (isAdmin === "adminkolegahr") {
      navigate("/adminavatara");
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [isAdmin, navigate]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
