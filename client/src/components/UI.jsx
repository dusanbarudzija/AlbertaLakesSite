import { C } from "../constants";

export function NAV_LOGO({ size = 26, color = C.white }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="3" fill={color} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <rect key={i} x="13" y="3" width="2" height="6" rx="1" fill={color}
          transform={`rotate(${deg} 14 14)`} />
      ))}
    </svg>
  );
}

export function TextInput({ type = "text", value, onChange, placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width:"100%", padding:"11px 14px", fontSize:"14px", border:`1.5px solid ${C.sandDark}`, borderRadius:"8px", color:C.ink, background:C.white, outline:"none", transition:"border-color 0.15s" }}
      onFocus={e => e.target.style.borderColor = C.teal400}
      onBlur={e  => e.target.style.borderColor = C.sandDark}
    />
  );
}

export function PrimaryBtn({ onClick, children, fullWidth }) {
  return (
    <button onClick={onClick} style={{ width:fullWidth?"100%":"auto", padding:"11px 24px", background:`linear-gradient(135deg, ${C.teal600}, ${C.teal500})`, color:C.white, border:"none", borderRadius:"8px", fontSize:"14px", fontWeight:"600", cursor:"pointer", letterSpacing:"0.01em" }}>
      {children}
    </button>
  );
}

export function AuthWrap({ children }) {
  return (
    <div style={{ flex:1, background:C.sand, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
      <div className="page-fade" style={{ width:"100%", maxWidth:"380px", background:C.white, borderRadius:"16px", padding:"2.5rem", boxShadow:"0 8px 40px rgba(10,46,42,0.10)" }}>
        {children}
      </div>
    </div>
  );
}

export function PageBanner({ title, subtitle, actionLabel, onActionClick }) {
  return (
    <div style={{ background:`linear-gradient(135deg, ${C.teal900} 0%, ${C.teal700} 100%)`, padding:"2rem 2.5rem", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", right:"-40px", top:"-40px", width:"200px", height:"200px", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.07)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:"-80px", top:"-80px", width:"300px", height:"300px", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.04)", pointerEvents:"none" }} />
      <h1 style={{ fontFamily:"'DM Serif Display', serif", fontSize:"26px", fontWeight:"400", color:C.white, marginBottom:"4px" }}>{title}</h1>
      {subtitle && <p style={{ fontSize:"13px", color:C.teal200 }}>{subtitle}</p>}
      {actionLabel && (
        <button onClick={onActionClick} style={{ marginTop:"12px", background:"transparent", border:`1px solid ${C.teal400}`, color:C.teal300, padding:"6px 16px", borderRadius:"99px", fontSize:"13px", cursor:"pointer", fontWeight:"500" }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function SectionLabel({ title, count }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"0.75rem 2rem", background:C.white, borderBottom:`1px solid ${C.sandDark}` }}>
      <span style={{ fontSize:"13px", fontWeight:"600", color:C.ink2, textTransform:"uppercase", letterSpacing:"0.06em" }}>{title}</span>
      {count !== undefined && (
        <span style={{ background:C.teal100, color:C.teal700, fontSize:"11px", fontWeight:"600", padding:"2px 8px", borderRadius:"99px" }}>{count}</span>
      )}
    </div>
  );
}
