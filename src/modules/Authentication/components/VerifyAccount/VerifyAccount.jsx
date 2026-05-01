import { useForm } from "react-hook-form"
import Register from './../Register/Register';

export default function VerifyAccount() {
   let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
      <div>
      <div className="header">
        <h3 className="h4 fw-bold "> Verify Account  
</h3>
        <span className="text-muted">
        Please Enter Your Otp  or Check Your Inbox
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
         <button
          className="btn btn-success w-100 text-white fw-bold rounded-2 my-1"
          type="submit"
        >
        Send
        </button>
</form>
</div>
  )
}
