import { useState, useEffect } from "react";
import { C } from "../constants";
import { fetchCommentsForReview, reviewComment, deleteComment } from "../services/dataService";
import { SectionLabel } from "../components/UI";
import Toast from "../components/Toast";

export default function AdminPage() {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchCommentsForReview().then(setReports).catch(console.error);
  }, []);

  const showToast = (msg, type) => { setToast({ message:msg, type }); setTimeout(() => setToast(null), 3000); };

  const approve = id => {
    reviewComment(id, 'approved')
      .then(() => { setReports(r => r.map(x => x.id===id ? { ...x, status:"approved" } : x)); showToast("Report approved.", "success"); })
      .catch(console.error);
  };
  const remove = id => {
    deleteComment(id)
      .then(() => { setReports(r => r.filter(x => x.id!==id)); showToast("Report deleted.", "danger"); })
      .catch(console.error);
  };

  const pending  = reports.filter(r => r.status === "pending");
  const approved = reports.filter(r => r.status === "approved");

  return (
    <div className="page-fade" style={{ flex:1, background:C.sand }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Detail Modal */}
      {selected && (
        <div style={{ position:"fixed", inset:0, background:"rgba(10,30,28,0.5)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}
          onClick={() => setSelected(null)}>
          <div style={{ background:C.white, borderRadius:"16px", padding:"2rem", width:"440px", maxWidth:"100%", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
              <span style={{ fontFamily:"'DM Serif Display', serif", fontSize:"20px", color:C.ink }}>Report Detail</span>
              <span onClick={() => setSelected(null)} style={{ cursor:"pointer", fontSize:"20px", color:C.ink4 }}>×</span>
            </div>
            <div style={{ background:C.teal50, borderRadius:"10px", padding:"14px 16px", marginBottom:"16px" }}>
              <p style={{ fontSize:"12px", color:C.teal600, fontWeight:"600", marginBottom:"4px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Submitted by</p>
              <p style={{ fontSize:"15px", fontWeight:"500", color:C.ink }}>{selected.username}</p>
              <p style={{ fontSize:"12px", color:C.ink4, marginTop:"4px" }}>{selected.date}</p>
            </div>
            <p style={{ fontSize:"12px", color:C.ink3, fontWeight:"600", marginBottom:"8px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Comment</p>
            <p style={{ fontSize:"14px", color:C.ink2, lineHeight:"1.6", background:C.sand, padding:"12px 14px", borderRadius:"8px", fontStyle:"italic" }}>"{selected.comment}"</p>
            <div style={{ display:"flex", gap:"10px", marginTop:"1.5rem" }}>
              <button onClick={() => { approve(selected.id); setSelected(null); }} style={{ flex:1, padding:"10px", borderRadius:"8px", border:"1px solid #9de0bb", background:C.greenBg, color:C.green, cursor:"pointer", fontSize:"13px", fontWeight:"600" }}>Approve</button>
              <button onClick={() => { remove(selected.id);  setSelected(null); }} style={{ flex:1, padding:"10px", borderRadius:"8px", border:"1px solid #f5bfbb", background:C.redBg,   color:C.red,   cursor:"pointer", fontSize:"13px", fontWeight:"600" }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Reports */}
      <SectionLabel title="Submitted Reports" count={pending.length} />
      <div style={{ padding:"1.25rem 2rem", maxWidth:"780px" }}>
        {pending.length === 0 && (
          <div style={{ textAlign:"center", padding:"3rem", color:C.ink4, fontSize:"14px" }}>No pending reports — all clear!</div>
        )}
        {pending.map(r => (
          <div key={r.id} className="card-hover" style={{ background:C.white, border:`1px solid ${C.sandDark}`, borderRadius:"12px", padding:"1rem 1.25rem", marginBottom:"10px", display:"flex", alignItems:"center", gap:"1rem" }}>
            <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:C.teal100, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ fontSize:"14px", fontWeight:"600", color:C.teal700 }}>{r.username[0].toUpperCase()}</span>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"3px" }}>
                <span style={{ fontSize:"13px", fontWeight:"600", color:C.ink }}>{r.username}</span>
                <span style={{ fontSize:"11px", color:C.ink4 }}>{r.date}</span>
              </div>
              <p style={{ margin:0, fontSize:"13px", color:C.ink3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>"{r.comment}"</p>
            </div>
            <div style={{ display:"flex", gap:"1rem", flexShrink:0 }}>
              <span className="action-btn" onClick={() => setSelected(r)} style={{ fontSize:"13px", fontWeight:"500", cursor:"pointer", color:C.teal600 }}>View</span>
              <span className="action-btn" onClick={() => approve(r.id)}  style={{ fontSize:"13px", fontWeight:"500", cursor:"pointer", color:C.green }}>Approve</span>
              <span className="action-btn" onClick={() => remove(r.id)}   style={{ fontSize:"13px", fontWeight:"500", cursor:"pointer", color:C.red }}>Delete</span>
            </div>
          </div>
        ))}
      </div>

      {/* Approved Reports */}
      {approved.length > 0 && (
        <>
          <SectionLabel title="Approved" count={approved.length} />
          <div style={{ padding:"1.25rem 2rem", maxWidth:"780px" }}>
            {approved.map(r => (
              <div key={r.id} style={{ background:C.greenBg, border:"1px solid #9de0bb", borderRadius:"12px", padding:"1rem 1.25rem", marginBottom:"10px", display:"flex", alignItems:"center", gap:"1rem" }}>
                <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"#c8efd8", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:"14px", fontWeight:"600", color:C.green }}>{r.username[0].toUpperCase()}</span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"3px" }}>
                    <span style={{ fontSize:"13px", fontWeight:"600", color:C.ink }}>{r.username}</span>
                    <span style={{ fontSize:"11px", color:C.ink4 }}>{r.date}</span>
                  </div>
                  <p style={{ margin:0, fontSize:"13px", color:C.ink3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>"{r.comment}"</p>
                </div>
                <span className="pill" style={{ background:"#c8efd8", color:C.green }}>Approved</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
