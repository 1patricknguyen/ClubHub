import { use, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';


export default function Welcome() {

    interface MyJwtPayload {
        sub: string; 
        role: string;
        
      }
    const [name, setName] = useState<string | null>(null); // getting name
    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
          try {
            const decoded = jwtDecode<MyJwtPayload>(tokenFromStorage); 
            setName(decoded.sub);
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      }, []);
      return (
        <div className="bg-zinc-950 min-h-screen text-stone-200 flex items-center justify-center">
            <h1>Welcome {name}!</h1>
        </div>
    );

}