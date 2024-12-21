import  { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { RiCloseLine as RxCross2 } from "react-icons/ri";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyProject = () => {
  const [myProjects, setMyProjects] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  //const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
     // setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/project/getmyprojects",
          { withCredentials: true }
        );
        console.log("Fetched Projects:", data);
        setMyProjects(data.myprojects);
      } catch (error) {
        console.error("Error fetching projects:", error.response?.data || error);
        toast.error(error.response?.data?.message || "Failed to fetch projects.");
        setMyProjects([]);
      } finally {
       // setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  

  if (!isAuthorized || (user && user.role !== "Project Head")) {
    console.log("Authorization failed:", { isAuthorized, user });
    navigateTo("/");
  }

  const handleEnableEdit = (projectId) => {
    setEditingMode(projectId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateProject = async (projectId) => {
    try {
      const updatedProject = myProjects.find((project) => project._id === projectId);
      const response = await axios.put(
        `http://localhost:4000/api/v1/project/update/${projectId}`,
        updatedProject,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/project/delete/${projectId}`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setMyProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (projectId, field, value) => {
    setMyProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId ? { ...project, [field]: value } : project
      )
    );
  };

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1>Your Posted Projects</h1>
          {myProjects && myProjects.length > 0 ? (
            <div className="banner">
              {myProjects.map((element) => (
                <div className="card" key={element._id}>
                  <div className="content">
                    <div className="short_fields">
                      <div>
                        <span>Title:</span>
                        <input
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.title}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "title",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <span>Category:</span>
                        <select
                          value={element.category}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "category",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== element._id}
                        >
                          <option value="Graphics & Design">Graphics & Design</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="Frontend Web Development">Frontend Web Development</option>
                          <option value="MERN Stack Development">MERN STACK Development</option>
                          <option value="Account & Finance">Account & Finance</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Video Animation">Video Animation</option>
                          <option value="MEAN Stack Development">MEAN STACK Development</option>
                          <option value="MEVN Stack Development">MEVN STACK Development</option>
                          <option value="Data Entry Operator">Data Entry Operator</option>
                        </select>
                      </div>
                      <div>
                        <span>Expired:</span>
                        <select
                          value={element.expired}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "expired",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== element._id}
                        >
                          <option value={true}>TRUE</option>
                          <option value={false}>FALSE</option>
                        </select>
                      </div>
                    </div>
                    <div className="long_field">
                      <div>
                        <span>Description:</span>{" "}
                        <textarea
                          rows={5}
                          value={element.description}
                          disabled={editingMode !== element._id}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="button_wrapper">
                    <div className="edit_btn_wrapper">
                      {editingMode === element._id ? (
                        <>
                          <button
                            onClick={() => handleUpdateProject(element._id)}
                            className="check_btn"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={handleDisableEdit}
                            className="cross_btn"
                          >
                            <RxCross2 />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEnableEdit(element._id)}
                          className="edit_btn"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteProject(element._id)}
                      className="delete_btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You have not posted any project or may be you deleted all of your projects!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProject;  