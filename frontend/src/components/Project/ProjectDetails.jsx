import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from '../../main';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null); // Initialize with null
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/project/${id}`, {
      withCredentials: true,
    }).then(res => {
      setProject(res.data.project);
    }).catch((err) => {
      if (err.response && err.response.status === 404) {
        setError("Project not found");
      } else {
        setError("An error occurred while fetching the project details");
      }
    });
  }, []); // Add id as a dependency

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, []); // Add dependencies

  if (error) {
    return <div>{error}</div>; // Display error message if any error occurs
  }

  if (!project) {
    return <div>Loading...</div>; // Show loading state while project is being fetched
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
          {user && user.role === "Project Head" ? ( <></> ) : (
            <Link to={`/application/${project._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;
