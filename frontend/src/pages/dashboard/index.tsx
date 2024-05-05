import React from "react";
import Logo from "@/components/Logo";
import LogoutButton from "@/components/LogoutButton";
import withAuth from "@/auth/withAuth";

function App() {
    return (
      <div>
        <Logo src="/pdpsilogo.png" />
        <LogoutButton />
      </div>
    );
  }
  
  export default withAuth(App);
