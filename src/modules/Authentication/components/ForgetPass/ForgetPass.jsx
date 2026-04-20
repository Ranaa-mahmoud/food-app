import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgetPass() {
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",data);
      navigate("/reset-pass");

      toast.success("Reset link sent to your email ");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ");
    }
  };
  return (
    <div>
      <div className="header">
        <h3 className="h4 fw-bold ">Forgot Your Password?</h3>
        <span className="text-muted fs-6">
          No worries! Please enter your email and we will send a password reset
          link
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <div className="custom-input my-4  ">
          <i className="fa-solid fa-envelope"></i>
          <span className="divider"></span>
          <input
            type="email"
            id="email"
            name="email"
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
        <button
          className=" btn btn-success  w-100 text-white fw-bold rounded-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
