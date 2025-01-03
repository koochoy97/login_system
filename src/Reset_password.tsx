import { useContext, useState, useRef, useEffect } from "react";
import { DataContext } from "./Context/DataContext";
import { useNavigate } from "react-router";

export function Reset_password() {
  const {
    login_user,
    user,
    user_logged,
    loading_auth,
    reset_password,
    loading_reset_password,
    reset_success,
  } = useContext(DataContext);
  const [email, setEmail] = useState("");

  let navigate = useNavigate();

  const handle_submit = (e) => {
    reset_password(email);
  };

  useEffect(() => {
    if (user_logged === true) {
      navigate("/welcome");
    }
  }, [user_logged]);

  useEffect(() => {
    if (reset_success === true) {
      navigate("/");
    }
  }, [reset_success]);

  return (
    <div className="w-full flex flex-col h-full items-center font-['Plus_Jakarta_Sans'] px-6 max-w-[480px]">
      <img src="./public/Logo.png" className="w-[120px]" alt="" />
      <div className="header text-center">
        <h1 className="text-3xl font-bold">Reset Your Password</h1>
        <p className="text-[#475569] font-light mt-2">
          Forgot your password? No worries, then let’s submit password reset. It
          will be send to your email.
        </p>
      </div>

      <div className="flex flex-col justify-center items-start w-full mt-6">
        <label className="text-sm font-bold" htmlFor="email">
          Email Addres
        </label>
        <div className="border w-full py-3 px-6 rounded-full mt-2 bg-white flex gap-2 items-center">
          <img src="./public/mail.svg" alt="" />
          <input
            type="text"
            className="bg-white w-full"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
      </div>

      <button
        className="w-full mt-3 bg-[#4F46E5] py-3 px-6 rounded-full text-white flex justify-center items-center"
        onClick={handle_submit}
      >
        {loading_reset_password ? (
          <img src="./public/loader.gif" alt="" className="w-[20px]" />
        ) : (
          <span className="flex gap-2 items-center">
            Reset Password
            <span>
              <img src="./public/lock_white.svg" alt="" />
            </span>
          </span>
        )}
      </button>

      <div className="create_account flex flex-col justify-center items-center mt-3">
        <div
          className="row_1 flex justify-center items-center gap-1 text-sm font-bold cursor-pointer gap-3"
          onClick={() => navigate("/")}
        >
          <img src="./public/back.svg" alt="" />
          <p className="text-[#4F46E5]">Back to login screen</p>
        </div>
      </div>
    </div>
  );
}
