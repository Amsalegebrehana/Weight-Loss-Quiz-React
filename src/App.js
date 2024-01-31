import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Login from "./pages/Login";

function App() {

  const [response, setResponse] = useState([]); 

  const handleResponse = (response) => {
    setResponse(response);
  };

  const router = createBrowserRouter([
    { 
      name: "Home", 
      path: "/", 
      element: <Home onResponse={handleResponse}/> 
    },
    { 

      name: "Result", 
      path: "/result", 
      element: <Result response={response}/> 
    },
    { 

      name: "Login", 
      path: "/login", 
      element: <Login /> 
    },


  ]);

  return (
    <RouterProvider router={router} />
      
  );
}

export default App;
