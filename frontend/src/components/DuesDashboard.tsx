import { use, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function DuesDashboard() {
    interface JwtDues {
        id: number;
    }
    const [id, setId] = useState<number | null>(null); // getting id
    const [dues, setDues] = useState<number | null>(null); // getting dues
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

    useEffect(() => {
        if (id) {
            fetch(`https://clubhub-akeu.onrender.com/api/flask/users/dues/${id}/`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setDues(data.dues);
            });
        }
    }, [id]);
        return (
          <div className="fixed top-48 left-64 w-70 max-w-lg bg-gray-800 rounded-md px-4 py-2">
      <p className="text-white font-bold text-5xl text-center">Dues owed: ${dues}</p>
    </div>
        );
      }
        