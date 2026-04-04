import { C } from "../constants";

export default function Toast({ message, type, onClose, inline }) {
  const bg     = type === "success" ? C.greenBg : C.redBg;
  const text   = type === "success" ? C.green   : C.red;
  const border = type === "success" ? "#9de0bb" : "#f5bfbb";

  const posStyle = inline ? {} : { position:"fixed", top:"76px", right:"24px", zIndex:1000 };

  return (
    <div style={{ ...posStyle, background:bg, border:`1px solid ${border}`, borderRadius:"10px", padding:"8px 14px", fontSize:"13px", color:text, display:"flex", alignItems:"center", gap:"10px", boxShadow:"0 4px 16px rgba(0,0,0,0.1)" }}>
      <span>{message}</span>
      <span onClick={onClose} style={{ cursor:"pointer", fontWeight:"600", fontSize:"16px" }}>×</span>
    </div>
  );
}
