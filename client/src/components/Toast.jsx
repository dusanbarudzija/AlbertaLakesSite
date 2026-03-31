import { C } from "../constants";

export default function Toast({ message, type, onClose }) {
  const bg     = type === "success" ? C.greenBg : C.redBg;
  const text   = type === "success" ? C.green   : C.red;
  const border = type === "success" ? "#9de0bb" : "#f5bfbb";

  return (
    <div style={{ position:"fixed", top:"76px", right:"24px", zIndex:1000, background:bg, border:`1px solid ${border}`, borderRadius:"10px", padding:"12px 18px", fontSize:"14px", color:text, display:"flex", alignItems:"center", gap:"12px", boxShadow:"0 4px 16px rgba(0,0,0,0.1)" }}>
      <span>{message}</span>
      <span onClick={onClose} style={{ cursor:"pointer", fontWeight:"600", fontSize:"16px" }}>×</span>
    </div>
  );
}
