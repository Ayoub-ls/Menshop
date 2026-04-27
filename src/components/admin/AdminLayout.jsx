import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminBottomNav from './AdminBottomNav';

const AdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans pb-16 md:pb-0">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
          <Outlet />
        </div>
      </main>
      <AdminBottomNav />
    </div>
  );
};

export default AdminLayout;
