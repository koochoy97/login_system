import { useContext, useState, useRef, useEffect } from "react";
import { DataContext } from "./Context/DataContext";
import { useNavigate } from "react-router";

export function Sign_up() {
  const { login_user, user, user_logged, loading_auth } =
    useContext(DataContext);
  const [email, setEmail] = useState("jaime23koochoy@gmail.com");
  const [password, setPassword] = useState("Teclado6");

  const [hide, setHide] = useState(true);
  let navigate = useNavigate();

  const handle_submit = (e) => {
    login_user(email, password);
  };

  useEffect(() => {
    if (user_logged === true) {
      navigate("/welcome");
    }
  }, [user_logged]);

  return (
    <div className="w-full flex flex-col h-full items-center font-['Plus_Jakarta_Sans'] px-6">
      <img src="./public/Logo.png" className="w-[120px]" alt="" />
      <div className="header text-center">
        <h1 className="text-3xl font-bold">Sign in to your account</h1>
        <p className="text-[#475569] font-light mt-2">
          Unleash your inner sloth 4.0 right now.
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

      <div className="flex flex-col justify-center items-start w-full mt-3">
        <label className="text-sm font-bold" htmlFor="email">
          Password
        </label>
        <div className="border w-full py-3 px-6 rounded-full mt-2 bg-white flex gap-2 items-center">
          <img src="./public/lock.svg" alt="" />

          <input
            type={`${hide ? "password" : "text"}`}
            className=" w-full"
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

      <div className="remember_container w-full justify-start items-center flex mt-3">
        <input type="checkbox" className="mr-2" />
        <span className="text-sm font-medium">Remember For 30 Days</span>
      </div>

      <button
        className="w-full mt-3 bg-[#4F46E5] py-3 px-6 rounded-full text-white flex justify-center items-center"
        onClick={handle_submit}
      >
        {loading_auth ? (
          <img src="./public/loader.gif" alt="" className="w-[20px]" />
        ) : (
          "Sign In"
        )}
      </button>

      <div className="create_account flex flex-col justify-center items-center mt-3">
        <div className="row_1 flex justify-center items-center gap-1 text-sm font-bold cursor-pointer">
          <p>Don't have an account?</p>
          <p className="text-[#4F46E5]">Sign Up</p>
        </div>

        <div className="row_2 flex justify-center items-center gap-1 text-sm font-bold">
          <p className="text-[#4F46E5] mt-2 cursor-pointer">
            Forgot your password?
          </p>
        </div>
      </div>

      <div className="w-full relative flex justify-center items-center mt-6">
        <div className="h-[1px] bg-[#CBD5E1] w-full  "></div>
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F8FAFC] px-3 text-xs font-bold text-[#94A3B8] tracking-widest">
          OR
        </span>
      </div>

      <button className="w-full mt-3 bg-white border py-3 px-6 rounded-full text-[#1E293B] font-bold flex justify-center items-center">
        <img src="./public/google-icon.webp" className="w-[22px] mr-2" alt="" />
        Sign In With Google
      </button>

      <button className="w-full mt-3 bg-white border py-3 px-6 rounded-full text-[#1E293B] font-bold flex justify-center items-center">
        <img src="./public/facebook.png" className="w-[22px] mr-2" alt="" />
        Sign In With Meta
      </button>
    </div>
  );
}