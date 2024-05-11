'use client';
import React from "react";
import LogoutButton from "@/components/LogoutButton";
import withAuth from "@/auth/withAuth";
import Sidebar from "@/components/Sidebar";
import Welcome from "@/components/Welcome";


function App() {
    return (
      <div className="bg-zinc-950 min-h-screen text-stone-200">
        <Sidebar />
        <LogoutButton />
        <Welcome />
      </div>
    );
  }
  
  export default withAuth(App);
