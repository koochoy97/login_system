import { useState, useEffect, useContext } from "react";
import { DataContext } from "./Context/DataContext";

export function Warning_modal(props) {
  const handle_click_outside = (e) => {
    e.stopPropagation();
    props.setOpen_modal(false);
  };

  const { loading_auth, delete_user } = useContext(DataContext);

  return (
    <div
      className={`absolute transparent_background w-full h-full transition-all duration-300 cursor-pointer flex justify-center items-center   ${
        props.open_modal ? "opacity-100 z-50" : "opacity-0 z-[-1]"
      }`}
      onClick={handle_click_outside}
    >
      <div
        className="flex flex-col items-center font-['Plus_Jakarta_Sans'] px-6 w-[400px]  rounded-md bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">
          Are you sure you want to delete this user?
        </h2>
        <p className="text-[#475569] font-light mt-2 text-sm">
          This action cannot be undone and will permanently delete all data
          associated with this user.
        </p>
        <button
          className="w-full mt-3 py-2 px-6 bg-[#FFDCDC] text-[#BB1E1E] rounded-full border border-[#BB1E1E]  flex justify-center items-center"
          onClick={() => delete_user()}
        >
          {loading_auth ? (
            <img src="./public/loader.gif" alt="" className="w-[20px]" />
          ) : (
            <span className="flex gap-2 items-center">Yes, Delete Account</span>
          )}
        </button>

        <button
          className="w-full mt-3 border py-2 px-6 rounded-full text-[#475569] flex justify-center items-center"
          onClick={() => props.setOpen_modal(false)}
        >
          <span className="flex gap-2 items-center">Cancel</span>
        </button>
      </div>
    </div>
  );
}
