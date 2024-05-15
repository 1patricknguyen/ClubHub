import React, { useEffect, useState } from 'react';
import DuesProfile from './DuesProfile';

type User = {
  id: number;
  username: string;
  role: string;
  dues: string;
};

const DuesProfilesContainer = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/flask/users/');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-900 grid grid-cols-6 gap-10">
      {users.map((user) => (
        <DuesProfile key={user.id} user={user} />
      ))}
    </div>
  );
};
export default DuesProfilesContainer;