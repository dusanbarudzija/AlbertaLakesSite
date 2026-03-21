import { useState } from "react";
import { levelColor } from "../constants";
import { getMostRecentSample, getLakeComments, formatDate } from "../data";
import "../styles/LakeDetail.css";

export default function LakeDetail({ lake, currentUser, setPage, onBack }) {
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

  return (
    <div className="page-fade lake-detail">
      {/* Back button */}
      <button onClick={onBack} className="lake-detail-back-btn">
        <span className="lake-detail-back-arrow">&larr;</span> Back to Lakes
      </button>

      {/* Main lake card */}
      <div className="lake-detail-card">
        <div className="lake-detail-card-header">
          <h2 className="lake-detail-lake-name">{lake.name}</h2>
          <span className="pill" style={{ background: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}>
            {lake.level}
          </span>
        </div>

        <div className="lake-detail-fields">
          <div>
            <span className="lake-detail-field-label">Water Description</span>
            <div className="lake-detail-field-value">
              {waterDesc}
              {sampleDate && <span className="lake-detail-field-date">({sampleDate})</span>}
            </div>
          </div>

          <div>
            <span className="lake-detail-field-label">Total Cyanobacterial Cells (cells/mL)</span>
            <div className="lake-detail-field-value">
              {cyanoCells != null ? cyanoCells.toLocaleString() : "No data"}
              {sampleDate && <span className="lake-detail-field-date">({sampleDate})</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Comment input */}
      <div className="lake-detail-comment-box">
        <label className="lake-detail-comment-label">Leave a Comment</label>
        <textarea
          className="lake-detail-textarea"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="Share your recent thoughts about this lake..."
          rows={3}
        />
        {currentUser ? (
          <button onClick={handleSubmit} className="lake-detail-submit-btn">Submit</button>
        ) : (
          <button onClick={() => setPage("login")} className="lake-detail-submit-btn">Log in to Comment</button>
        )}
      </div>

      {/* Recent comments */}
      {comments.length > 0 && (
        <div className="lake-detail-comments-list">
          <span className="lake-detail-comments-heading">Recent Comments</span>
          {comments.map(com => (
            <div key={com.id} className="lake-detail-comment-card">
              <div className="lake-detail-comment-header">
                <div>
                  <span className="lake-detail-comment-location">{lake.name}</span>
                  <span className="lake-detail-comment-date">{com.date}</span>
                </div>
              </div>
              <p className="lake-detail-comment-user">{com.username}</p>
              <p className="lake-detail-comment-text">"{com.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
