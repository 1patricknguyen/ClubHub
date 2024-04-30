import React, { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // Prevent default form submission
    console.log('Username:', username, 'Password:', password);
    try {
      const response = await fetch('http://localhost:4000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const { access_token } = await response.json();
      localStorage.setItem('token', access_token);
      console.log('Login successful and token stored!');
    
  } catch (error) {
        console.error('Login error:', error);
    }
  };



  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 m-0 p-0">
      <div className="w-full text-center bg-red-500 text-white font-bold text-xl m-0">
      Pi Delta Psi Sigma Chapter Hub
    </div>
      <div className="w-full" style={{ height: '40vh', backgroundImage: "url('/banner.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}