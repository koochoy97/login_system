import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DataContext } from "./Context/DataContext";

export function Welcome() {
  const { user_logged, check_user, user, log_out } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      await check_user(); // Verificación del usuario (esperar la resolución de check_user)
      setLoading(false); // Una vez el usuario es verificado, ya no se muestra el loading
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (user_logged === false) {
      navigate("/");
    }
  }, [user_logged]);

  const handle_logout = () => {
    log_out();
  };

  if (user_logged === null) {
    return <div>Loading...</div>; // Mostrar el indicador de carga mientras se verifica el estado del usuario
  }

  if (user_logged === true) {
    return (
      <div>
        <h1>WELCOME</h1>
        <div>{user_logged?.toString()}</div>
        <button
          className="w-full mt-3 bg-slate-600 text-white"
          onClick={handle_logout}
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }
}
