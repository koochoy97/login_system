import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useContext } from "react";
import "./App.css";
import { DataContextProvider } from "./Context/DataContext";
import { Sign_in } from "./Sign_in";
import { Welcome } from "./Welcome";
import { Sign_up } from "./Sign_up";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Sign_in /> },
  { path: "/sign_up", element: <Sign_up /> },
  { path: "/welcome", element: <Welcome /> },
]);
function App() {
  return (
    <>
      <DataContextProvider>
        <div className="w-full flex h-screen justify-center items-center bg-[#F8FAFC] py-20">
          <RouterProvider router={router} />
        </div>
      </DataContextProvider>
    </>
  );
}

export default App;
