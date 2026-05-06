import { useForm } from "react-hook-form";
import { verify } from "/src/api/modules/auth.js"; // عدّل المسار حسب مشروعك

export default function VerifyAccount() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await verify(data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="header">
        <h3 className="h4 fw-bold">Verify Account</h3>
        <span className="text-muted">
          Please enter your OTP or check your inbox
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
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

        <div className="custom-input mt-3">
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
          className="btn btn-success w-100 text-white fw-bold rounded-2 my-3"
          type="submit"
        >
          Verify
        </button>
      </form>
    </div>
  );
}
