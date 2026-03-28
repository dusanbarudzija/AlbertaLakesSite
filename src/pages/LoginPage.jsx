import { useState } from "react";
import { C } from "../constants";
import { NAV_LOGO, TextInput, PrimaryBtn, AuthWrap } from "../components/UI";
import usersData from "../data/users.json";

export default function LoginPage({ setPage, onLogin }) {
  const [email, setEmail] = useState("");
  const [pw, setPw]       = useState("");
  const [err, setErr]     = useState("");

  const submit = () => {
    if (!email || !pw) { setErr("Please fill in all fields."); return; }
    const user = usersData.find(u => u.email === email);
    if (user && pw.length >= 3) { onLogin({ _id: user._id, username: user.username, role: user.role }); return; }
    setErr("Invalid email or password.");
  };

  return (
    <AuthWrap>
      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"1.5rem" }}>
        <NAV_LOGO size={22} color={C.teal600} />
        <span style={{ fontFamily:"'DM Serif Display', serif", fontSize:"20px", color:C.teal800 }}>LakeWatch</span>
      </div>

      <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:"24px", fontWeight:"400", color:C.ink, marginBottom:"6px" }}>Welcome back</h2>
      <p style={{ fontSize:"13px", color:C.ink4, marginBottom:"1.75rem" }}>Sign in to track your lakes and sightings.</p>

      {err && <p style={{ fontSize:"13px", color:C.red, background:C.redBg, padding:"10px 14px", borderRadius:"8px", marginBottom:"14px" }}>{err}</p>}

      <div style={{ marginBottom:"14px" }}>
        <label style={{ fontSize:"13px", fontWeight:"500", color:C.ink2, display:"block", marginBottom:"6px" }}>Email</label>
        <TextInput type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
      </div>
      <div style={{ marginBottom:"20px" }}>
        <label style={{ fontSize:"13px", fontWeight:"500", color:C.ink2, display:"block", marginBottom:"6px" }}>Password</label>
        <TextInput type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••" />
      </div>

      <PrimaryBtn onClick={submit} fullWidth>Sign In</PrimaryBtn>

      <p style={{ marginTop:"18px", fontSize:"13px", color:C.ink4, textAlign:"center" }}>
        No account?{" "}
        <span onClick={() => setPage("register")} style={{ color:C.teal600, cursor:"pointer", fontWeight:"500", textDecoration:"underline" }}>Create one</span>
      </p>
      <p style={{ marginTop:"14px", fontSize:"11px", color:C.ink4, textAlign:"center", background:C.sand, padding:"8px", borderRadius:"6px" }}>
        Demo admin: <strong>admin@test.com</strong> / <strong>admin</strong>
        <br />
        Demo user: <strong>sampleuser1234@email.com</strong> / <strong>(any)</strong>
      </p>
    </AuthWrap>
  );
}
