import { useContext } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";
import { AnimatedButton } from "../../components/ui/AnimatedButton";

const UsersProfile = () => {
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;
  return (
    <>
      <div className="w-full bg-gray-100">
        <div className=" p-4 bg-gradient-to-r from-yellow-300 to-yellow-100">
          <h2 className="text-2xl text-center font-bold text-gray-800">
            Users Profile
          </h2>
        </div>
      </div>

      {/* Users Profile Settings From Here */}
      <div className="w-full h-auto bg-[#f0f8ff]">
        <div className="px-32 py-6 flex items-center gap-8">
          <img
            src="/profiles/profile1.webp"
            alt="Profile Images"
            className="w-32 h-32 rounded-full"
          />
          <div>
            <h2 className="text-3xl font-bold ">{user?.name}</h2>
            <p className="text-gray-800">{user?.date}</p>
            <p className="text-gray-800">
              {user?.email}{" "}
              <span className="font-bold text-amber-600">(Verified)</span>
            </p>
            <div className="flex mt-4 items-center gap-6">
              <AnimatedButton name="Change Password" />
              <AnimatedButton name="Change Details" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersProfile;
