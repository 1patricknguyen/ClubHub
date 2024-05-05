import { useRouter } from 'next/router';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Clear the JWT from local storage
        localStorage.removeItem('token');

        // Redirect user to the homepage
        router.push('/');
    };

    return (
        <div className="absolute top-0 right-0 p-4">
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none">
            Logout
        </button>
        </div>
        
    );
};

export default LogoutButton;