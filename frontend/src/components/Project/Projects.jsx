import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
      return;
    }

    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("https://innovate-hub-backend.onrender.com/api/v1/project/getall", {
          withCredentials: true,
        });

        if (data && data.projects) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [isAuthorized, navigate]);

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE PROJECTS</h1>
        <div className="banner">
          {projects.length > 0 ? (
            projects.map((element) => (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <Link to={`/project/${element._id}`}>Project Details</Link>
              </div>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
