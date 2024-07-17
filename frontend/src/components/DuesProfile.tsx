import React, { useState } from 'react';


const UserProfile = ({ user }: any) => {
    const [dues, setDues] = useState(user.dues);
    const [newDues, setNewDues] = useState(user.dues);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
        setError(null);
        setSuccessMessage('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDues((e.target.value));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/flask/users/dues/${user.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({ dues: newDues }),
            }); 
            if (!response.ok) {
                throw new Error('Failed to update dues');
            }
            setDues(newDues);
            setIsEditing(false);
            setSuccessMessage('Dues updated successfully!');
        } catch (error) {
            setError('Failed to update dues');
            setSuccessMessage('');
        }
    }

    return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-4 w-200 text-white">
            <h2 className="text-lg font-bold mb-4">{user.display_name}</h2>
            <p className="mb-2">Role: {user.role}</p>
            <p className="mb-2">Dues: ${dues}</p>
            {isEditing ? (
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="dues" className="block text-sm font-medium text-gray-700">
                        New Dues
                    </label>
                    <input
                        id="dues"
                        type="number"
                        value={newDues}
                        onChange={handleInputChange}
                        className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                    <div className="mt-4 flex items-center justify-between">
                        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">
                            Save
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)} className="text-indigo-500">
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button onClick={handleEditClick} className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4">
                    Edit Dues
                </button>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        </div>
    );
};

export default UserProfile;