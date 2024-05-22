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
            fetch(`http://localhost:4000/api/flask/users/dues/${id}/`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setDues(data.dues);
            });
        }
    }, [id]);
        return (
          <div className="bg-gray-900 min-h-screen text-white items-center flex-grow justify-center">
          <div style={{ height: '100px' }} className="p-10 bg-gray-800 rounded shadow-xl w-1/3 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-4 text-white">Dues Owed: ${dues}</h1>
          </div>
        </div>
        );
      }
        