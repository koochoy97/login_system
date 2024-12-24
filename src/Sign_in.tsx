import { useContext, useState, useRef, useEffect } from "react";
import { DataContext } from "./Context/DataContext";
import { useNavigate } from "react-router";

export function Sign_in() {
  const { login_user, user, user_logged } = useContext(DataContext);
  const [email, setEmail] = useState("jaime23koochoy@gmail.com");
  const [password, setPassword] = useState("Teclado6");

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
    <div className="w-[550px] flex flex-col h-[300px] justify-center items-center bg-white p-10">
      <div>{user_logged?.toString()}</div>
      <div className="flex flex-col justify-center items-start w-full">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="border w-full"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </div>

      <div className="flex flex-col justify-center items-start w-full mt-3">
        <label htmlFor="email">Password</label>
        <input
          type="password"
          className="border w-full"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
      </div>

      <button
        className="w-full mt-3 bg-slate-600 text-white"
        onClick={handle_submit}
      >
        Iniciar Sesión
      </button>
    </div>
  );
}
