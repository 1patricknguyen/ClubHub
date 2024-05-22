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
        <div style={{ marginLeft: '244px', marginTop: '20px' }} className="bg-gray-900 min-h-screen text-white items-center flex-grow justify-center">
          <div style={{ height: '100px' }} className="p-10 bg-gray-800 rounded shadow-xl w-1/3 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-4 text-white">Welcome back, {name}!</h1>
            <p className="text-gray-300">We're glad to see you again!</p>
          </div>
        </div>
      );
      

}