'use client';
import React from "react";
import LogoutButton from "@/components/LogoutButton";
import withAuth from "@/auth/withAuth";
import Sidebar from "@/components/Sidebar";
import Welcome from "@/components/Welcome";
import DuesDashboard from "@/components/DuesDashboard";


function App() {
    return (
      <div className="bg-gray-900 min-h-screen text-stone-200 flex">
        <Sidebar />
        <Welcome />
        <DuesDashboard />
        <LogoutButton />
      </div>
    );
  }
  
  export default withAuth(App);
