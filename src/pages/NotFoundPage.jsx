import { C } from "../constants";
import { PrimaryBtn } from "../components/UI";

export default function NotFoundPage({ setPage }) {
  return (
    <div className="page-fade" style={{ 
      flex: 1, 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      background: C.sand,
      textAlign: "center"
    }}>
      
      <h1 style={{ fontSize: "120px", color: C.teal900, marginBottom: "-20px" }}>404</h1>
      <h2 style={{ fontFamily: "'DM Serif Display', serif", color: C.teal800, fontSize: "32px", marginBottom: "16px" }}>
        Page Not Found
      </h2>
      <p style={{ color: C.ink3, marginBottom: "2.5rem", maxWidth: "400px", lineHeight: "1.6" }}>
        It looks like you've drifted into uncharted waters. The page you are looking for doesn't exist on our map.
      </p>
      
      <PrimaryBtn onClick={() => setPage("home")}>
        Return Home
      </PrimaryBtn>
    </div>
  );
}