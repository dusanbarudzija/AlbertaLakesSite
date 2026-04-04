import { useState, useEffect } from "react";
import { levelColor } from "../constants";
import { fetchLakeComments, submitComment, saveLake, formatDate } from "../services/dataService";
import Toast from "./Toast";
import "../styles/LakeInfo.css";
import addLakeIcon from "../public/assets/addLake.png";

export default function LakeInfo({ lake, currentUser, setPage, onBack }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchLakeComments(lake._id).then(setComments).catch(console.error);
  }, [lake._id]);

  const lc = levelColor(lake.level);

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const waterDesc = lake.waterDescription || "No data";
  const waterDescDate = lake.waterDescriptionDate ? formatDate(lake.waterDescriptionDate) : null;
  const cyanoCells = lake.cellCount;
  const cellCountDate = lake.cellCountDate ? formatDate(lake.cellCountDate) : null;

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    submitComment(lake._id, commentText.trim())
      .then(() => {
        setCommentText("");
      })
      .catch(console.error);
  };

  const handleAddToSaved = () => {
    saveLake(lake._id)
      .then(() => showToast("Lake saved!", "success"))
      .catch(e => {
        if (e.message === "Lake already saved.") showToast("Already saved!", "error");
        else showToast("Failed to save.", "error");
      });
  };

  return (
    <>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-fade lake-info">

        {/* Back button */}
      <button onClick={onBack} className="lake-info-back-btn">
        <span className="lake-info-back-arrow">&larr;</span> Back to Lakes
      </button>

      {/* Main lake card */}
      <div className="lake-info-card">
        <div className="lake-info-card-header">
          <h2 className="lake-info-lake-name">{lake.name}</h2>
          <span className="pill" style={{ background: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}>
            {lake.level}
          </span>
        </div>

        <div className="lake-info-fields">
          <div>
            <span className="lake-info-field-label">Water Description</span>
            <div className="lake-info-field-value">
              {waterDesc}
              {waterDescDate && <span className="lake-info-field-date">({waterDescDate})</span>}
            </div>
          </div>

          <div>
            <span className="lake-info-field-label">Total Cyanobacterial Cells (cells/mL)</span>
            <div className="lake-info-field-value">
              {cyanoCells != null ? cyanoCells.toLocaleString() : "No data"}
              {cellCountDate && <span className="lake-info-field-date">({cellCountDate})</span>}
            </div>
          </div>
        </div>

        <div className="lake-info-card-footer">
          {currentUser ? (
            <button
              type="button"
              onClick={handleAddToSaved}
              className="lake-info-add-icon-btn"
            >
              <img src={addLakeIcon} alt="" className="lake-info-add-icon" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setPage("login")}
              className="lake-info-add-icon-btn"
            >
              <img src={addLakeIcon} alt="" className="lake-info-add-icon" />
            </button>
          )}
        </div>
      </div>

      {/* Comment input */}
      <div className="lake-info-comment-box">
        <label className="lake-info-comment-label">Leave a Comment</label>
        <textarea
          className="lake-info-textarea"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="Share your recent thoughts about this lake..."
          rows={3}
        />
        {currentUser ? (
          <button onClick={handleSubmit} className="lake-info-submit-btn">Submit</button>
        ) : (
          <button onClick={() => setPage("login")} className="lake-info-submit-btn">Log in to Comment</button>
        )}
      </div>

      {/* Recent comments */}
      {comments.length > 0 && (
        <div className="lake-info-comments-list">
          <span className="lake-info-comments-heading">Recent Comments</span>
          {comments.map(com => (
            <div key={com.id} className="lake-info-comment-card">
              <div className="lake-info-comment-header">
                <p className="lake-info-comment-user">{com.username}</p>
                <span className="lake-info-comment-date">{com.date}</span>
              </div>
              <p className="lake-info-comment-text">"{com.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
