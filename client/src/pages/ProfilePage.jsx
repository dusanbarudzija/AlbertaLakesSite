import { useState, useEffect } from "react";
import { C, levelColor } from "../constants";
import { fetchSavedLakes, removeSavedLake, fetchUserComments, deleteComment } from "../services/dataService";
import { SectionLabel } from "../components/UI";

export default function ProfilePage({ currentUser, setPage, setProfileSelectedLakeId }) {
  const [locations, setLocations] = useState([]);
  const [comments,  setComments]  = useState([]);
  const [expanded, setExpanded]   = useState(null);

  useEffect(() => {
    fetchSavedLakes().then(setLocations).catch(console.error);
    fetchUserComments(currentUser?._id).then(setComments).catch(console.error);
  }, [currentUser]);

  return (
    <div className="page-fade" style={{ flex:1, background:C.sand }}>

      {/* Saved Locations */}
      <SectionLabel title="Saved Locations" count={locations.length} />
      <div style={{ padding:"1.25rem 2rem" }}>
        {locations.length === 0 && (
          <p style={{ color:C.ink4, fontSize:"14px", padding:"1rem 0" }}>No saved locations yet.</p>
        )}
        {locations.map(loc => {
          const lc = levelColor(loc.level);
          return (
            <div key={loc._id} className="card-hover"
              onClick={() => setExpanded(expanded === loc._id ? null : loc._id)}
              style={{ background:C.white, border:`1px solid ${C.sandDark}`, borderRadius:"12px", padding:"1rem 1.25rem", marginBottom:"12px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
                    <span style={{ fontSize:"15px", fontWeight:"600", color:C.ink }}>{loc.name}</span>
                    <span className="pill" style={{ background:lc.bg, color:lc.text, border:`1px solid ${lc.border}` }}>{loc.level ?? "No data"}</span>
                  </div>
                  <div style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap" }}>
                    {[
                      ["Water Description", loc.waterDescription],
                      ["Cell Count", loc.cellCount != null ? loc.cellCount.toLocaleString() : null],
                      ...(expanded === loc._id ? [
                        ["Beach", loc.beachName]
                      ] : [])
                    ].map(([k, v]) => (
                      <span key={k} style={{ fontSize:"13px", color:C.ink3 }}>
                        <span style={{ fontWeight:"500", color:C.ink2 }}>{k}: </span>{v ?? "No data"}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display:"flex", gap:"14px", alignItems:"center", flexShrink:0 }}>
                  <span style={{ fontSize:"12px", color:C.ink4 }}>{expanded===loc._id ? "▲" : "▼"}</span>
                  <span className="action-btn"
                    onClick={e => { e.stopPropagation(); setProfileSelectedLakeId(loc._id); setPage("home"); }}
                    style={{ fontSize:"13px", color:C.teal600, cursor:"pointer", fontWeight:"500" }}>
                    View
                  </span>
                  <span className="action-btn"
                    onClick={e => { e.stopPropagation(); removeSavedLake(loc._id).then(() => setLocations(l => l.filter(x => x._id !== loc._id))).catch(console.error); }}
                    style={{ fontSize:"13px", color:C.red, cursor:"pointer", fontWeight:"500" }}>
                    Remove
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comments */}
      <SectionLabel title="My Comments" count={comments.length} />
      <div style={{ padding:"1.25rem 2rem" }}>
        {comments.length === 0 && (
          <p style={{ color:C.ink4, fontSize:"14px", padding:"1rem 0" }}>No comments yet.</p>
        )}
        {comments.map(com => (
          <div key={com.id} style={{ background:C.white, border:`1px solid ${C.sandDark}`, borderRadius:"12px", padding:"1rem 1.25rem", marginBottom:"12px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px" }}>
              <div>
                <span style={{ fontSize:"14px", fontWeight:"600", color:C.ink }}>{com.location}</span>
                <span style={{ fontSize:"12px", color:C.ink4, marginLeft:"10px" }}>{com.date}</span>
              </div>
              <span className="action-btn"
                onClick={() => deleteComment(com.id).then(() => setComments(c => c.filter(x => x.id !== com.id))).catch(console.error)}
                style={{ fontSize:"13px", color:C.red, cursor:"pointer", fontWeight:"500" }}>
                Delete
              </span>
            </div>
            <p style={{ margin:"0 0 6px", fontSize:"12px", color:C.teal600, fontWeight:"500" }}>{currentUser?.username}</p>
            <p style={{ margin:0, fontSize:"13px", color:C.ink3, fontStyle:"italic", lineHeight:"1.6" }}>"{com.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
