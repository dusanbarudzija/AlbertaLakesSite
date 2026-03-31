import { useState } from "react";
import { C } from "../constants";
import { NAV_LOGO, TextInput, PrimaryBtn, AuthWrap } from "../components/UI";
import { register } from "../services/dataService";

export default function RegisterPage({ setPage, onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [pw, setPw]             = useState("");
  const [err, setErr]           = useState("");

  const submit = async () => {
    if (!username || !email || !pw) { setErr("Please fill in all fields."); return; }
    if (!email.includes("@"))       { setErr("Enter a valid email."); return; }
    if (pw.length < 6)              { setErr("Password needs 6+ characters."); return; }
    try {
      const data = await register(username, email, pw);
      onLogin(data);
    } catch (e) {
      setErr(e.message || "Registration failed.");
    }
  };

  const fields = [
    { label:"Username", val:username, set:setUsername, type:"text",     ph:"your_username" },
    { label:"Email",    val:email,    set:setEmail,    type:"email",    ph:"you@email.com" },
    { label:"Password", val:pw,       set:setPw,       type:"password", ph:"6+ characters" },
  ];

  return (
    <AuthWrap>
      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"1.5rem" }}>
        <NAV_LOGO size={22} color={C.teal600} />
        <span style={{ fontFamily:"'DM Serif Display', serif", fontSize:"20px", color:C.teal800 }}>LakeWatch</span>
      </div>

      <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:"24px", fontWeight:"400", color:C.ink, marginBottom:"4px" }}>Create an account</h2>
      <p style={{ fontSize:"13px", color:C.ink4, marginBottom:"1.75rem", fontStyle:"italic" }}>Save lakes and comment your sightings.</p>

      {err && <p style={{ fontSize:"13px", color:C.red, background:C.redBg, padding:"10px 14px", borderRadius:"8px", marginBottom:"14px" }}>{err}</p>}

      {fields.map(f => (
        <div key={f.label} style={{ marginBottom:"14px" }}>
          <label style={{ fontSize:"13px", fontWeight:"500", color:C.ink2, display:"block", marginBottom:"6px" }}>{f.label}</label>
          <TextInput type={f.type} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} />
        </div>
      ))}

      <div style={{ marginTop:"6px" }}>
        <PrimaryBtn onClick={submit} fullWidth>Create Account</PrimaryBtn>
      </div>

      <p style={{ marginTop:"18px", fontSize:"13px", color:C.ink4, textAlign:"center" }}>
        Already have one?{" "}
        <span onClick={() => setPage("login")} style={{ color:C.teal600, cursor:"pointer", fontWeight:"500", textDecoration:"underline" }}>Sign in</span>
      </p>
    </AuthWrap>
  );
}
