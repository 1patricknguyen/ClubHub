import React from "react";
import LogoutButton from "@/components/LogoutButton";
import withAuth from "@/auth/withAuth";
import Sidebar from "@/components/Sidebar";


function App() {
    return (
      <div className="bg-zinc-950 min-h-screen text-stone-200">
        <Sidebar />
        <LogoutButton />
      </div>
    );
  }
  
  export default withAuth(App);
