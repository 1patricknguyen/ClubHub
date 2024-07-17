import { use, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';


export default function Welcome() {

    interface MyJwtPayload {
        display_name: string; 
        role: string;
        
      }
    const [name, setName] = useState<string | null>(null); // getting name
    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
          try {
            const decoded = jwtDecode<MyJwtPayload>(tokenFromStorage); 
            setName(decoded.display_name);
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      }, []);
      return (
        <div className="fixed top-8 left-64 w-170 max-w-lg bg-gray-800 rounded-md px-4 py-2">
          <p className="text-white font-bold text-5xl text-center">Welcome back, {name}!</p>
        </div>
      );
      

}