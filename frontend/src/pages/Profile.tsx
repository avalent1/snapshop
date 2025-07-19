import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  bio?: string;
}

const defaultUser: UserProfile = {
  name: 'Antonio Valent',
  email: 'antonio@snapshop.com',
  avatar: 'https://res.cloudinary.com/dq9demmal/image/upload/v1752331123/WhatsApp_Slika_2025-02-11_u_19.01.01_dba67bda_e912zu.jpg',
  
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(defaultUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 mb-4"
        />
        {editMode ? (
          <>
            <input
              name="name"
              className="text-xl font-bold text-center mb-2 border rounded p-1"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="email"
              className="text-gray-600 text-sm text-center mb-2 border rounded p-1"
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="bio"
              className="w-full text-center border rounded p-2 text-gray-700 mb-4"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Your bio..."
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={handleSave}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-700 italic mt-2">{user.bio}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;