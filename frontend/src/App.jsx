import  { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Projects from "./components/Project/Projects";
import ProjectDetails from "./components/Project/ProjectDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplication";
import PostProject from "./components/Project/PostProject";
import NotFound from "./components/NotFound/NotFound";
import MyProjects from "./components/Project/MyProject";
import { Toaster } from "react-hot-toast";

const App = () => {
  const {  setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser", // Replace with the correct endpoint
          {
            withCredentials: true,
          }
        );
        console.log("Fetched user:", response.data.user); // Debugging
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [setIsAuthorized, setUser]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/project/getall" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/project/post" element={<PostProject />} />
          <Route path="/project/getmyprojects" element={<MyProjects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
