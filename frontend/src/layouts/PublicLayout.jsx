import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-yellow-400 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 bg-white">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;