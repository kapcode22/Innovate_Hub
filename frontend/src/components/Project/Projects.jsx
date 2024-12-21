import  { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Projects = () => {
  
    const [projects, setprojects] = useState([]);
    const { isAuthorized } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
      try {
        axios
          .get("http://localhost:4000/api/v1/project/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setprojects(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    }, []);
    if (!isAuthorized) {
      navigate("/login");
    }
  
    return (
      <section className="jobs page">
        <div className="container">
          <h1>ALL AVAILABLE PROJECTS</h1>
          <div className="banner">
            {projects.projects &&
              projects.projects.map((element) => {
                return (
                  <div className="card" key={element._id}>
                    <p>{element.title}</p>
                    <p>{element.category}</p>
          
                    <Link to={`/project/${element._id}`}>Project Details</Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  };
export default Projects
