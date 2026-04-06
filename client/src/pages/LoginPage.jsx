import { useState } from "react";
import { C } from "../constants";
import { NAV_LOGO, TextInput, PrimaryBtn, AuthWrap } from "../components/UI";
import { login } from "../services/dataService";

export default function LoginPage({ setPage, onLogin }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const submit = (e) => {
    if (e) e.preventDefault();
    if (!email || !pw) { setErr("Please fill in all fields."); return; }

    login(email, pw)
      .then(data => onLogin(data))
      .catch(e => setErr(e.message || "Invalid email or password."));
  };

  return (
    <AuthWrap>
      <form onSubmit={submit}>
        <div style={{display:"flex", alignItems:"center", gap:"8px", marginBottom:"1.5rem" }}>
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

      <PrimaryBtn fullWidth>Sign In</PrimaryBtn>
      </form>

      <p style={{ marginTop:"18px", fontSize:"13px", color:C.ink4, textAlign:"center" }}>
        No account?{" "}
        <span onClick={() => setPage("register")} style={{ color:C.teal600, cursor:"pointer", fontWeight:"500", textDecoration:"underline" }}>Create one</span>
      </p>
    </AuthWrap >
  );
}
