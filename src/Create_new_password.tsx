import { useContext, useState, useRef, useEffect } from "react";
import { DataContext } from "./Context/DataContext";
import { useNavigate, useSearchParams } from "react-router";

export function Create_new_password() {
  const { user_logged, loading_auth, firebase_create_new_password } =
    useContext(DataContext);
  const [hide, setHide] = useState(true);
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const action_code = searchParams.get("oobCode");

  const handle_submit = (e) => {
    firebase_create_new_password(action_code, password);
  };

  return (
    <div className="w-full flex flex-col h-full items-center font-['Plus_Jakarta_Sans'] px-6 max-w-[480px]">
      <img src="./public/Logo.png" className="w-[120px]" alt="" />
      <div className="header text-center">
        <h1 className="text-3xl font-bold">Create Your New Password</h1>
        <p className="text-[#475569] font-light mt-2">
          Reset your password. Please enter your new password below and confirm
          it to complete the process. Make sure your password is strong and
          secure.
        </p>
      </div>

      <div className="flex flex-col justify-center items-start w-full mt-3">
        <label className="text-sm font-bold" htmlFor="email">
          New Password
        </label>
        <div className="border w-full py-3 px-6 rounded-full mt-2 bg-white flex gap-2 items-center">
          <img src="./public/lock.svg" alt="" />

          <input
            type={`${hide ? "password" : "text"}`}
            className=" w-full focus:outline-none"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          {hide ? (
            <img
              src="./public/hide.svg"
              alt=""
              className="cursor-pointer"
              onClick={() => setHide(false)}
            />
          ) : (
            <img
              src="./public/unhide.svg"
              alt=""
              className="cursor-pointer"
              onClick={() => setHide(true)}
            />
          )}
        </div>
      </div>

      <button
        className="w-full mt-3 bg-[#4F46E5] py-3 px-6 rounded-full text-white flex justify-center items-center"
        onClick={handle_submit}
      >
        {loading_auth ? (
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
