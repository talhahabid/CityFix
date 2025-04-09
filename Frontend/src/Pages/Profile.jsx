import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignOut } from "../hooks/useSignOut";
const Profile = () => {
  const { signOut } = useSignOut();

  const { user } = useAuthContext();

  const userTypeCapitalized =
    user?.user?.userType.charAt(0).toUpperCase() +
    user?.user?.userType.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="max-w-md bg-gray-900 rounded-lg p-8 text-white shadow-lg">
        <div className="flex justify-center mb-6">
          <img
            className="rounded-full w-32 h-32"
            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
            alt="Profile"
          />
        </div>
        <div className="text-center">
          <p className="font-semibold text-xl mb-4">
            Email: {user?.user?.email}
          </p>
          <p className="font-semibold text-xl mb-4">Password: ********</p>
          <p className="font-semibold text-xl mb-4">
            User Type: {userTypeCapitalized}
          </p>
        </div>
        <button
          className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 mt-6"
          onClick={() => signOut()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
