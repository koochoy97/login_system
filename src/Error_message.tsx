import { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/DataContext";
export function Error_message() {
  const { error, setError } = useContext(DataContext);

  useEffect(() => {
    setError(null);

    return () => {};
  }, []);

  const [error_message, set_error_message] = useState("");
  useEffect(() => {
    switch (error?.code) {
      case "auth/invalid-credential":
        set_error_message("Wrong password or email");
        break;
      case "auth/email-already-in-use":
        set_error_message("Email already in use");
        break;

      case "auth/missing-password":
        set_error_message("Missing password");
        break;
    }

    return () => {};
  }, [error]);

  if (error) {
    return (
      <div className="w-full flex flex-col items-center font-['Plus_Jakarta_Sans']">
        <div className=" text-center">
          <p className="text-[#e84949] font-light mt-2">
            {error_message
              ? error_message
              : "Something went wrong, please try again"}
          </p>
        </div>
      </div>
    );
  }
}
