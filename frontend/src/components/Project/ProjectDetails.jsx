import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from '../../main';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: No token found. Please login.");
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `https://innovate-hub-backend.onrender.com/api/v1/project/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setProject(res.data.project);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            setError("Unauthorized: Please log in to access this project.");
            navigate("/login");
          } else if (err.response.status === 404) {
            setError("Project not found");
          } else {
            setError("An error occurred while fetching project details");
          }
        } else {
          setError("Network error. Please try again.");
        }
      }
    };

    fetchProject();
  }, [id, navigate]);

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!project) {
    return <div className="loader">Fetching project details...</div>;
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Project Details</h3>
        <div className="banner">
          <p>
            Title: <span>{project.title}</span>
          </p>
          <p>
            Category: <span>{project.category}</span>
          </p>
          <p>
            Description: <span>{project.description}</span>
          </p>
          <p>
            Job Posted On: <span>{project.projectPostedOn}</span>
          </p>
          {user && user.role === "Project Head" ? null : (
            <Link to={`/application/${project._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;

