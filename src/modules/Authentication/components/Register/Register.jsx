import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../../../api/modules/auth";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
       await registerUser(data);

      toast.success("success register");

      navigate("/verify-account");

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <div className="header">
        <h3 className="h4 fw-bold">Register</h3>
        <span className="text-muted">
          Welcome Back! Please enter your details
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <div className="container">
          <div className="row">
            {/* Left side */}
            <div className="col-md-6">
              <div className="custom-input mb-3">
                <i className="fa-solid fa-user"></i>
                <span className="divider"></span>

                <input
                  type="text"
                  placeholder="UserName"
                  {...register("userName", {
                    required: "Field is Required",
                  })}
                />
              </div>
              {errors.userName && (
                <span className="text-danger">{errors.userName.message}</span>
              )}

              <div className="custom-input mb-3">
                <i className="fa-solid fa-globe"></i>
                <span className="divider"></span>

                <input
                  type="text"
                  placeholder="Country"
                  {...register("country", {
                    required: "Field is Required",
                  })}
                />
              </div>
              {errors.country && (
                <span className="text-danger">{errors.country.message}</span>
              )}

              <div className="custom-input mb-3">
                <i className="fa-solid fa-lock"></i>
                <span className="divider"></span>

                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Field is Required",
                    minLength: {
                      value: 8,
                      message: "Min 8 characters required",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>

            {/* Right side */}
            <div className="col-md-6">
              <div className="custom-input mb-3">
                <i className="fa-solid fa-envelope"></i>
                <span className="divider"></span>

                <input
                  type="email"
                  placeholder="Enter your E-mail"
                  {...register("email", {
                    required: "Field is Required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}

              <div className="custom-input mb-3">
                <i className="fa-solid fa-phone"></i>
                <span className="divider"></span>

                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phoneNumber", {
                    required: "Field is Required",
                  })}
                />
              </div>
              {errors.phone && (
                <span className="text-danger">{errors.phone.message}</span>
              )}

              <div className="custom-input mb-3">
                <i className="fa-solid fa-lock"></i>
                <span className="divider"></span>

                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Field is Required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-danger">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="links my-4 d-flex justify-content-between">
            <Link
              to="/login"
              className="text-muted text-decoration-none fw-medium"
            >
              Login Now ?
            </Link>
          </div>

          {/* Submit */}
          <button className="btn btn-success w-100 text-white fw-bold rounded-2">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}