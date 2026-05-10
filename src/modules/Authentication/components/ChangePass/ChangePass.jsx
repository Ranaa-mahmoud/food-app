import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import photo from "/src/assets/images/Group.svg";
import { changePassword } from "../../../../api/modules/auth";
import { toast } from "react-toastify";

export default function ChangePass({ show, handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const newPassword = watch("newPassword");

  // ================= SHOW PASSWORD STATES =================
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ================= SUBMIT =================
  const onSubmit = async (data) => {
    try {
      await changePassword(data);

      toast.success("Password changed successfully");

      reset();

      handleClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to change password"
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton />

      <Modal.Body>
        {/* ================= IMAGE ================= */}
        <div className="text-center mb-5">
          <img src={photo} alt="change-password" className="img-fluid" />
        </div>

        {/* ================= TITLE ================= */}
        <div className="px-5">
          <h2>Change Your Password</h2>
          <p>Enter your details below</p>
        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column gap-3 px-5 mt-3"
        >
          {/* fake username input for browser autocomplete */}
          <input
            type="text"
            name="username"
            autoComplete="username"
            hidden
          />

          {/* ================= OLD PASSWORD ================= */}
          <div className="custom-input my-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center w-100">
              <i className="fa-solid fa-lock"></i>

              <span className="divider"></span>

              <input
                type={showOld ? "text" : "password"}
                placeholder="Old Password"
                autoComplete="current-password"
                className="w-100 border-0 bg-transparent"
                {...register("oldPassword", {
                  required: "Old password is required",
                })}
              />
            </div>

            <i
              className={`fa ${showOld ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowOld(!showOld)}
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          {errors.oldPassword && (
            <span className="text-danger">
              {errors.oldPassword.message}
            </span>
          )}

          {/* ================= NEW PASSWORD ================= */}
          <div className="custom-input my-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center w-100">
              <i className="fa-solid fa-lock"></i>

              <span className="divider"></span>

              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                autoComplete="new-password"
                className="w-100 border-0 bg-transparent"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
            </div>

            <i
              className={`fa ${showNew ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowNew(!showNew)}
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          {errors.newPassword && (
            <span className="text-danger">
              {errors.newPassword.message}
            </span>
          )}

          {/* ================= CONFIRM PASSWORD ================= */}
          <div className="custom-input my-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center w-100">
              <i className="fa-solid fa-lock"></i>

              <span className="divider"></span>

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                autoComplete="new-password"
                className="w-100 border-0 bg-transparent"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
              />
            </div>

            <i
              className={`fa ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowConfirm(!showConfirm)}
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          {errors.confirmPassword && (
            <span className="text-danger">
              {errors.confirmPassword.message}
            </span>
          )}

          {/* ================= BUTTON ================= */}
          <button type="submit" className="btn btn-success w-100 mt-3">
            Change Password
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}