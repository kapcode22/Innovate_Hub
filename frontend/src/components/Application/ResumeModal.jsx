
/* eslint-disable react/prop-types */
const ResumeModal = ({imageUrl,onClose}) => {
  // console.log("Image URL:", imageUrl);

  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {imageUrl ? (
          <img src={imageUrl} alt="resume" />
        ) : (
          <p>Image not available</p>
        )}
      </div>
    </div>
  );
};

export default ResumeModal;
