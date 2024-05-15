import { use, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function DuesDashboard() {
    interface JwtDues {
        id: number;
    }
    const [id, setId] = useState<number | null>(null); // getting id
    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
          try {
            const decoded = jwtDecode<JwtDues>(tokenFromStorage); 
            console.log(decoded);
            setId(decoded.id);
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      } , []);
        return (
            <h1>joe mama</h1>
        );
}