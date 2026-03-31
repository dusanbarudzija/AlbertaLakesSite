import * as api from './http';

export const formatDate = (iso) => {
  const d = new Date(iso);
  return `${String(d.getUTCMonth() + 1).padStart(2, '0')}/${String(d.getUTCDate()).padStart(2, '0')}/${d.getUTCFullYear()}`;
};

export const getLevel = (cells) => {
  if (cells == null) return "No data";
  if (cells >= 100000) return "High";
  if (cells >= 20000) return "Moderate";
  return "Low";
};


export const fetchLakes = async () => {
  const data = await api.fetchLakes();
  return data.map(lake => ({
    ...lake,
    level: getLevel(lake.cellCount),
  }));
};

export const fetchLakeComments = async (waterbodyId) => {
  const data = await api.fetchComments({ waterbodyId, reviewStatus: 'approved' });
  return data.slice(0, 5).map(c => ({
    id: c._id,
    username: c.username,
    date: formatDate(c.commentDateTime),
    comment: c.commentText,
  }));
};

// Admin page
export const fetchCommentsForReview = async () => {
  const data = await api.fetchComments();
  return data.map(c => ({
    id: c._id,
    username: c.username,
    comment: c.commentText,
    date: formatDate(c.commentDateTime),
    status: c.reviewStatus,
  }));
};

export const fetchUserComments = async (userId) => {
  const data = await api.fetchComments({ userId });
  return data.map(c => ({
    id: c._id,
    location: c.waterbodyName,
    date: formatDate(c.commentDateTime),
    comment: c.commentText,
  }));
};

export const fetchSavedLakes = async () => {
  const data = await api.fetchSavedLakes();
  return data.map(loc => ({
    ...loc,
    level: getLevel(loc.cellCount),
  }));
};

// Re-export http.js functions so frontend components can import from dataService.js only
export {
  submitComment,
  reviewComment,
  deleteComment,
  saveLake,
  removeSavedLake,
  login,
  register,
  logout,
  getMe,
} from './http';
