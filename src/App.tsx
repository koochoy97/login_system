import "./App.css";
import { DataContextProvider } from "./Context/DataContext";
import { Sign_in } from "./Sign_in";
import { Welcome } from "./Welcome";
import { Sign_up } from "./Sign_up";
import { Reset_password } from "./Reset_password";
import { Create_new_password } from "./Create_new_password";
import { Toaster } from "react-hot-toast";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Sign_in /> },
  { path: "/sign_up", element: <Sign_up /> },
  { path: "/welcome", element: <Welcome /> },
  { path: "/reset_password", element: <Reset_password /> },
  { path: "create_new_password", element: <Create_new_password /> },
]);
function App() {
  return (
    <>
      <DataContextProvider>
        <Toaster />
        <div className="w-full flex h-screen justify-center items-center bg-[#F8FAFC] py-20">
          <RouterProvider router={router} />
        </div>
      </DataContextProvider>
    </>
  );
}

export default App;
