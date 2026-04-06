import { useState, useEffect } from "react";
import { levelColor } from "../constants";
import { fetchLakeComments, submitComment, deleteComment, saveLake, formatDate } from "../services/dataService";
import Toast from "./Toast";
import "../styles/LakeInfo.css";
import addLakeIcon from "../public/assets/addLake.png";

export default function LakeInfo({ lake, currentUser, setPage, onBack }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [toast, setToast] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteConfirmToast, setDeleteConfirmToast] = useState(null);


    useEffect(() => {
    fetchLakeComments(lake._id).then(setComments).catch(console.error);
  }, [lake._id]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openMenuId && !event.target.closest('.lake-info-menu-container')) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openMenuId]);

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
    document.activeElement?.blur();
    if (!commentText.trim()) return showToast("Comment cannot be empty.", "error");
    submitComment(lake._id, commentText.trim())
      .then(() => {
        setCommentText("");
        showToast("Comment submitted! It will appear here once reviewed.", "success");
      })
      .catch(() => showToast("Error submitting comment.", "error"));
  };

  const handleDeleteComment = (commentId) => {
    setDeleteConfirmToast({ commentId });
    setOpenMenuId(null); // Close the three-dot menu
  };

  const handleDeleteConfirm = async () => {
    const commentId = deleteConfirmToast?.commentId;
    if (!commentId) return;

    try {
        await deleteComment(commentId);
        setComments(comments.filter(c => c.id !== commentId));
        setDeleteConfirmToast(null);
        showToast("Comment deleted successfully.", "success");
    } catch (error) {
        console.error("Delete error:", error);
        setDeleteConfirmToast(null);
        showToast(error.message || "Failed to delete comment.", "error");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmToast(null);
  };

  const keyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (currentUser) {
        handleSubmit();
      } else {
        setPage("login");
      }
    }
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
      <div className="page-fade lake-info">

        {/* Back button + toast row */}
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          <button onClick={onBack} className="lake-info-back-btn">
            <span className="lake-info-back-arrow">&larr;</span> Back to Lakes
          </button>
          {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} inline />}
        </div>


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
            className={`lake-info-textarea ${commentText.trim() ? "has-text" : "is-empty"}`}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={keyDown}
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
                              <div>
                                  <p className="lake-info-comment-user">{com.username}</p>
                                  <span className="lake-info-comment-date">{com.date}</span>
                              </div>

                              {/* Three-dot menu (only show for comment owner) */}
                              {currentUser && currentUser.username === com.username && (
                                  <div className="lake-info-menu-container">
                                      <button
                                          className="lake-info-menu-button"
                                          onClick={() => setOpenMenuId(openMenuId === com.id ? null : com.id)}
                                          aria-label="Comment options"
                                      >
                                          ⋮
                                      </button>

                                      {/* Dropdown menu */}
                                      {openMenuId === com.id && (
                                          <div className="lake-info-menu-dropdown">
                                              <button
                                                  className="lake-info-menu-item delete"
                                                  onClick={() => handleDeleteComment(com.id)}
                                              >
                                                  Delete
                                              </button>
                                          </div>
                                      )}
                                  </div>
                              )}
                          </div>

                          <p className="lake-info-comment-text">"{com.comment}"</p>
                      </div>
                  ))}
              </div>
          )}
      </div>
        {deleteConfirmToast && (
            <Toast
                message="Are you sure you want to delete this comment?"
                type="error"
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                confirmText="Delete"
                cancelText="Cancel"
                modal
            />
        )}
    </>
  );
}
