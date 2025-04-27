import React, { useState, useEffect } from 'react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('lastName', data.lastName);
        localStorage.setItem('email', data.email);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({firstName: firstName, lastName: lastName, password: null, email: null}),
      });
      
      if (response.ok) {
        setIsEditing(false);
        fetchProfile();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-blue-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">User Profile</h1>
          <p className="text-blue-600">Manage your account information</p>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 p-6">
        <div className="space-y-6">
          <div className="border-b border-blue-100 pb-6">
            <h3 className="text-lg font-medium text-blue-900">Account Information</h3>
            <p className="mt-1 text-sm text-blue-600">Update your personal details below</p>
          </div>

          <div className="pt-2">
            <dl className="divide-y divide-blue-100">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-blue-700">Email address</dt>
                <dd className="mt-1 text-sm text-blue-900 sm:mt-0 sm:col-span-2">{profile.email}</dd>
              </div>

              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-blue-700">Full Name</dt>
                <dd className="mt-1 text-sm text-blue-900 sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor="firstName" className="block text-sm font-medium text-blue-700">First Name</label>
                        <input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor="lastName" className="block text-sm font-medium text-blue-700">Last Name</label>
                        <input
                          id="lastName"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div className="col-span-3 flex items-center justify-end space-x-3 mt-4">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="py-2 px-4 border border-blue-300 shadow-sm text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span>{profile.firstName} {profile.lastName}</span>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;