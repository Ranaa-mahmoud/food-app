import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import photo from "/src/assets/images/Group.svg";

export default function ChangePass({ show, handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body>
        <div className="text-center mb-5">
          <img src={photo} alt="change-password" className="img-fluid" />
        </div>

        <div className="px-5">
          <h2>Change Your Password</h2>
          <p>Enter your details below</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column gap-3 px-5 mt-3"
        >
        <input type="text" name="username" autoComplete="username" hidden />
          {/* OLD PASSWORD */}
          <div className="custom-input my-3">
            <i className="fa-solid fa-lock"></i>
            <span className="divider"></span>

            <input
              type="password"
              placeholder="Old Password"
              autoComplete="current-password"
              {...register("oldPassword", {
                required: "Required",
              })}
            />
          </div>

          {errors.oldPassword && (
            <span className="text-danger">
              {errors.oldPassword.message}
            </span>
          )}

          {/* NEW PASSWORD */}
          <div className="custom-input my-3">
            <i className="fa-solid fa-lock"></i>
            <span className="divider"></span>

            <input
              type="password"
              placeholder="New Password"
              autoComplete="new-password"
              {...register("newPassword", {
                required: "Required",
                minLength: {
                  value: 8,
                  message: "Min 8 characters",
                },
              })}
            />
          </div>

          {errors.newPassword && (
            <span className="text-danger">
              {errors.newPassword.message}
            </span>
          )}

          {/* CONFIRM PASSWORD */}
          <div className="custom-input my-3">
            <i className="fa-solid fa-lock"></i>
            <span className="divider"></span>

            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
          </div>

          {errors.confirmPassword && (
            <span className="text-danger">
              {errors.confirmPassword.message}
            </span>
          )}

          <button className="btn btn-success w-100 mt-3">
            Change Password
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}