import { useState } from "react";
import { levelColor } from "../constants";
import { getMostRecentSample, getLakeComments, formatDate } from "../data";
import "../styles/LakeInfo.css";
import addLakeIcon from "../public/assets/addLake.png";

export default function LakeInfo({ lake, currentUser, setPage, onBack }) {
  const sample = getMostRecentSample(lake.id);
  const [comments, setComments] = useState(getLakeComments(lake.id));
  const [commentText, setCommentText] = useState("");

  const lc = levelColor(lake.level);
  const sampleDate = sample ? formatDate(sample.collectionDateTime) : null;

  const waterDesc = sample && sample.waterDescriptionNotes ? sample.waterDescriptionNotes : "No data";
  const cyanoCells = sample?.totalCyanobacterial_cells_mL;

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    const newComment = {
      userId: currentUser._id,
      siteId: null,
      waterbodyId: lake.id,
      commentText: commentText.trim(),
      commentDateTime: new Date().toISOString(),
      reviewStatus: "pending",
    };
    // This will be sent to db via POST
    setCommentText("");
  };

  const handleAddToSaved = () => {
    const savedLocation = {
      userId: currentUser._id,
      waterbodyId: lake.id,
    };
    // This will be sent to db via POST
  };

  return (
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
              {sampleDate && <span className="lake-info-field-date">({sampleDate})</span>}
            </div>
          </div>

          <div>
            <span className="lake-info-field-label">Total Cyanobacterial Cells (cells/mL)</span>
            <div className="lake-info-field-value">
              {cyanoCells != null ? cyanoCells.toLocaleString() : "No data"}
              {sampleDate && <span className="lake-info-field-date">({sampleDate})</span>}
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
  );
}
