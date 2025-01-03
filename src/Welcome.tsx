import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DataContext } from "./Context/DataContext";
import { Warning_modal } from "./Warning_modal";
import { Full_name_input } from "./Full_name_input";

export function Welcome() {
  const {
    user_logged,
    check_user,
    user,
    log_out,
    reset_password,
    getUserData,
    user_data,
    setUser,
    setUser_data,
    loading_reset_password,
  } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [mail, setMail] = useState("");
  const [open_modal, setOpen_modal] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      await check_user(); // Verificación del usuario (esperar la resolución de check_user)
      setLoading(false); // Una vez el usuario es verificado, ya no se muestra el loading
    }
    fetchUser();

    return () => {
      setUser({});
      setUser_data({});
    };
  }, []);

  useEffect(() => {
    if (user_logged === false) {
      navigate("/");
    }
  }, [user_logged]);

  useEffect(() => {
    if (user.uid) {
      console.log("sadafsa");
      getUserData();
    }
    setMail(user?.email);
  }, [user]);

  const handle_logout = () => {
    log_out();
  };

  if (user_logged === null) {
    return <div>Loading...</div>; // Mostrar el indicador de carga mientras se verifica el estado del usuario
  }

  if (user_logged === true) {
    return (
      <div className=" flex flex-col justify-center items-center w-[70%]">
        <Warning_modal open_modal={open_modal} setOpen_modal={setOpen_modal} />
        <img src="./public/Logo.png" className="w-[120px]" alt="" />

        <h1 className="text-3xl font-bold">Welcome, {user_data.full_name}!</h1>
        <div className="data_container w-full flex gap-x-10 flex-wrap my-10">
          <div className="flex flex-col justify-center items-start mt-4 w-[45%]">
            <label className="text-sm font-bold" htmlFor="email">
              Email
            </label>
            <div className="border w-full py-3 px-6 rounded-full mt-4 bg-slate-100 flex gap-2 items-center ">
              <input
                type="text"
                className="bg-slate-100 w-full focus:outline-none "
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                disabled
              />
              <img src="./public/mail.svg" alt="" />
            </div>
          </div>

          <Full_name_input />

          <div className="flex flex-col justify-center items-start mt-4 w-[45%]">
            <label className="text-sm font-bold" htmlFor="email">
              Password
            </label>
            <div className="w-full flex-col justify-between items-center  ">
              <div className="border  py-3 px-6 rounded-full mt-2 bg-slate-100 flex gap-2 items-center">
                <input
                  type="text"
                  className="bg-slate-100 w-full focus:outline-none"
                  value="********"
                  disabled
                />
              </div>
              <div
                className={`${
                  loading_reset_password ? "text-[#979797]" : "text-[#4F46E5] "
                }  cursor-pointer text-sm font-['Plus_Jakarta_Sans'] w-full flex  justify-start gap-2 items-center text-left transition-all duration-200`}
              >
                <p className=" relative" onClick={() => reset_password(mail)}>
                  Reset Password
                  <span className="absolute left-1/2 ">
                    <img
                      src="./public/loader.gif"
                      className={`w-[20px] transition-all duration-200 ${
                        loading_reset_password
                          ? "opacity-100 z-50"
                          : "opacity-0 z-0"
                      } opacity-0`}
                      alt=""
                    />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="w-full mt-3 bg-[#4F46E5] py-3 px-6 rounded-full text-white flex justify-center items-center"
          onClick={handle_logout}
        >
          <span className="flex gap-2 items-center">
            Log Out
            <span>
              <img src="./public/singin.svg" alt="" />
            </span>
          </span>
        </button>

        <button
          className="w-full mt-3 py-3 px-6 bg-[#FFDCDC] text-[#BB1E1E] rounded-full border border-[#BB1E1E]  flex justify-center items-center"
          onClick={() => setOpen_modal(true)}
        >
          <span className="flex gap-2 items-center">Delete Account</span>
        </button>
      </div>
    );
  }
}
