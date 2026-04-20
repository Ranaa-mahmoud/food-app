import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data,
      );

      toast.success(response.data.message);
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div>
      <div className="header">
        <h3 className="h4 fw-bold"> Reset Password</h3>
        <span className="text-muted">
          Please Enter Your Otp or Check Your Inbox
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        {/* EMAIL */}
        <div className="custom-input">
          <i className="fa-solid fa-envelope"></i>
          <span className="divider"></span>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Field is Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
        </div>

        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}

        {/* OTP */}
        <div className="custom-input">
          <i className="fa-solid fa-lock"></i>
          <span className="divider"></span>

          <input
            type="text"
            placeholder="OTP"
            {...register("seed", {
              required: "OTP is required",
            })}
          />
        </div>
        {errors.seed && (
          <span className="text-danger">{errors.seed.message}</span>
        )}
        {/* NEW PASSWORD */}
        <div className="custom-input">
          <i className="fa-solid fa-lock"></i>
          <span className="divider"></span>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                message: "Invalid password format",
              },
            })}
          />

          <i
            className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}

        {/* CONFIRM PASSWORD */}
        <div className="custom-input">
          <i className="fa-solid fa-lock"></i>
          <span className="divider"></span>

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
          />

          <i
            className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        {errors.confirmPassword && (
          <span className="text-danger">{errors.confirmPassword.message}</span>
        )}

        <button
          className="btn btn-success w-100 text-white fw-bold rounded-2 my-1"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
