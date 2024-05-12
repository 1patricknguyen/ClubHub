import Link from "next/link"
import { use, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function Sidebar() {
    

interface MyJwtPayload {
  sub: string; 
  role: string;
  
}

const [token, setToken] = useState<string | null>(null); // getting the 'hashed' token
const [decodedToken, setDecodedToken] = useState<MyJwtPayload | null>(null); // getting the whole decoded token
const [role, setRole] = useState<string | null>(null); // getting role
const [name, setName] = useState<string | null>(null); // getting name

useEffect(() => {
  const tokenFromStorage = localStorage.getItem('token');
  console.log('Token from storage:', tokenFromStorage);
  if (tokenFromStorage) {
    try {
      const decoded = jwtDecode<MyJwtPayload>(tokenFromStorage); 
      console.log('Decoded Token:', decoded);
      setDecodedToken(decoded);
      setToken(tokenFromStorage);
      setRole(decoded.role);
      setName(decoded.sub);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}, []);

console.log('role:', role);
console.log('name:', name);



  return (
    <div className="fixed left-0 top-0 h-full w-56 bg-gray-900 text-white border-r border-gray-800">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <img src="/pdpsilogo.png" alt="PDPsi Logo" className="h-8" />
      </div>
      <nav className="flex flex-col space-y-1 p-4">
        <div className="space-y-1">
          <h3 className="px-2 text-xs font-medium uppercase tracking-wider text-gray-400">Main</h3>
          
          <Link className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-800" href="dashboard">
            <LayoutDashboardIcon className="h-5 w-5" />
            Dashboard
          </Link>
        </div>
        <div className="space-y-1">
          <h3 className="px-2 text-xs font-medium uppercase tracking-wider text-gray-400">Tools</h3>
          <Link className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-800" href="#">
            <UsersIcon className="h-5 w-5" />
            Members
          </Link>
          {(role === 'president' || role === 'treasurer' || role == 'developer') && (<Link className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-800" href="/treasurer">
          <CreditCardIcon className="h-5 w-5" />
          Edit Dues
          </Link>)}
          {(role === 'president' || role === 'ivp' || role === 'evp' || role === 'vps' || role == 'recorder' || role == 'developer') && (<Link className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-800" href="/memberevents">
          <CalendarIcon className="h-5 w-5" />
          Edit Member Events
          </Link>)}
          {(role === 'president' || role === 'recorder' || role === 'warden' || role == 'developer') && (<Link className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-800" href="/memberstatus">
          <StatusIcon className="h-5 w-5" />
          Edit Member Status
          </Link>)}
          {(role == 'developer') && (<Link className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-800" href="/treasurer">
          <DevIcon className="h-5 w-5" />
          Dev Tools
          </Link>)}
        </div>
      </nav>
    </div>
  )
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function CreditCardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}


function FileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function StatusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function ImportIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m8 11 4 4 4-4" />
      <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
    </svg>
  )
}


function LayoutDashboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}




function ProjectorIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 7 3 5" />
      <path d="M9 6V3" />
      <path d="m13 7 2-2" />
      <circle cx="9" cy="13" r="3" />
      <path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" />
      <path d="M16 16h2" />
    </svg>
  )
}


function DevIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}