import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login",data);

      localStorage.setItem("token", response.data?.data?.accessToken);
      toast.success("Login successful 🎉");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div>
      <div className="header">
        <h3 className="h4 fw-bold ">Log In</h3>
        <span className="text-muted">
          Welcome Back! Please enter your details
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        {/* EMAIL */}
        <div className="custom-input">
          <i className="fa-solid fa-envelope"></i>
          <span className="divider"></span>

          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="Enter your email"
            aria-describedby="emailelplBlock"
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

        <div className="custom-input my-3">
          <i className="fa-solid fa-lock"></i>
          <span className="divider"></span>

          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your Password"
            autoComplete="current-password"
            aria-describedby="passwordelplBlock"
            {...register("password", {
              required: "field is requierd",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                message:
                  "Password must be at least 8 characters",
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

        <div className="links my-4 d-flex justify-content-between ">
          <Link
            to="/register"
            className="text-muted text-decoration-none fw-medium"
          >
            Register Now ?
          </Link>

          <Link
            to="/forget-pass"
            className="text-success text-decoration-none fw-medium"
          >
            Forget Password ?
          </Link>
        </div>

        {/* BUTTON */}
        <button
          className="btn btn-success w-100 text-white fw-bold rounded-2"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
