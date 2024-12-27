import { useEffect, useState } from "react";
export function Full_name_input() {
  const [disable_full_name_input, setDisable_full_name_input] = useState(true);
  const [temp_full_name, setTemp_full_name] = useState("");
  const [full_name, setFull_name] = useState("");

  useEffect(() => {
    setFull_name("Jaime Koochoy");
    setTemp_full_name("Jaime Koochoy");
  }, []);
  const save_edited_full_name = () => {
    setDisable_full_name_input(true);
    setFull_name(temp_full_name);
  };

  const cancel_edited_full_name = () => {
    setDisable_full_name_input(true);
    setTemp_full_name(full_name);
  };
  return (
    <div className="flex flex-col justify-center items-start mt-4 w-[45%]">
      <label className="text-sm font-bold" htmlFor="email">
        Full Name
      </label>
      <div className="w-full flex gap-3 items-center mt-2 ">
        <div
          className={`border py-3 px-6 rounded-full ${
            disable_full_name_input ? "bg-slate-100" : "bg-white"
          }  flex gap-1 items-center w-full`}
        >
          <input
            type="text"
            className=" w-full focus:outline-none"
            disabled={disable_full_name_input}
            value={temp_full_name}
            onChange={(e) => setTemp_full_name(e.target.value)}
          />
          <img src="./public/mail.svg" alt="" />
        </div>
        {disable_full_name_input ? (
          <img
            src="./public/edit-pen.svg"
            className="cursor-pointer h-[25px]"
            onClick={() => setDisable_full_name_input(false)}
          />
        ) : (
          ""
        )}
        {!disable_full_name_input ? (
          <div className="flex gap-2">
            <img
              src="./public/save.svg"
              className="cursor-pointer h-[25px]"
              onClick={save_edited_full_name}
            />
            <img
              src="./public/close.svg"
              className="cursor-pointer h-[25px]"
              onClick={cancel_edited_full_name}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
