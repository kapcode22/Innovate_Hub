import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How JobZee Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
              Join Us and Unlock Endless Opportunities
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Project/Post a Project</p>
              <p>
              Explore Projects, Share Your Ideas
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Project/Recruit Suitable Student</p>
              <p>
              Join Innovative Projects, Connect with Future Stars
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;