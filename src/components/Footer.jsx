import { C } from "../constants";

export default function Footer() {
    const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: C.sandDark,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 2rem",
        height: "40px",
        flexShrink: 0,
      }}
    >
    <span
        style={{
        color: C.ink4,
        fontSize: "12px",
        letterSpacing: "0.01em",
        textAlign: "center"
        }}
    >
        © {year} LakeWatch. All rights reserved.
    </span>
    </footer>
  );
}