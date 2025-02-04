import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../common/IconBtn";

const genders = ["Male", "Female", "Other", "Prefer not to say"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitProfileForm)}
      className="w-full max-w-2xl mx-auto p-4 space-y-6"
    >
      <h1 className="font-bold text-lg lg:text-xl">Profile</h1>

      {/* First & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="font-semibold text-sm lg:text-base">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter first name"
            className="border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
            {...register("firstName", { required: true })}
            defaultValue={user?.firstName}
          />
          {errors.firstName && (
            <span className="text-sm text-red-500">Please enter your first name.</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName" className="font-semibold text-sm lg:text-base">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter last name"
            className="border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
            {...register("lastName", { required: true })}
            defaultValue={user?.lastName}
          />
          {errors.lastName && (
            <span className="text-sm text-red-500">Please enter your last name.</span>
          )}
        </div>
      </div>

      {/* Date of Birth & Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="dateOfBirth" className="font-semibold text-sm lg:text-base">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            className="border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
            {...register("dateOfBirth", {
              required: "Please enter your Date of Birth.",
              max: {
                value: new Date().toISOString().split("T")[0],
                message: "Date of Birth cannot be in the future.",
              },
            })}
            defaultValue={user?.additionalDetails?.dateOfBirth}
          />
          {errors.dateOfBirth && (
            <span className="text-sm text-red-500">{errors.dateOfBirth.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className="font-semibold text-sm lg:text-base">
            Gender
          </label>
          <select
            id="gender"
            className="border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
            {...register("gender", { required: "Please select a gender." })}
            defaultValue={user?.additionalDetails?.gender}
          >
            {genders.map((ele, i) => (
              <option key={i} value={ele}>
                {ele}
              </option>
            ))}
          </select>
          {errors.gender && (
            <span className="text-sm text-red-500">{errors.gender.message}</span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Save" />
      </div>
    </form>
  );
}
