import { C } from "../constants";
import { NAV_LOGO } from "./UI";

export default function Navbar({ page, setPage, currentUser }) {
  const isAdmin = currentUser?.role === "admin";

  const isActive = (key) => page === key;

  const navItemStyle = (key) => ({
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "400",
    color: isActive(key) ? C.teal300 : C.teal200,
    borderBottom: isActive(key) ? `2px solid ${C.teal300}` : "none",
    paddingBottom: "2px"
  });

  const navItems = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    ...(isAdmin ? [{ key: "admin", label: "Admin" }] : [])
  ];

  return (
    <nav
      style={{
        background: C.teal800,
        position: "sticky",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        height: "62px",
        flexShrink: 0
      }}
    >
      {/* Logo */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
        onClick={() => setPage("home")}
      >
        <NAV_LOGO />
        <span
          style={{
            color: C.white,
            fontFamily: "'DM Serif Display', serif",
            fontSize: "18px",
            letterSpacing: "0.01em"
          }}
        >
          LakeWatch
        </span>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
        {navItems.map((item) => (
          <span
            key={item.key}
            onClick={() => setPage(item.key)}
            style={navItemStyle(item.key)}
          >
            {item.label}
          </span>
        ))}

        {/* Sign-in button */}
        {currentUser ? (
          <span
            onClick={() => setPage("profile")}
            style={{
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: "500",
              color: isActive("profile") ? C.teal300 : C.white,
              background: isActive("profile") ? C.teal700 : "transparent",
              padding: "6px 14px",
              borderRadius: "99px",
              border: `1px solid ${C.teal600}`,
              transition: "all 0.15s"
            }}
          >
            {currentUser.username}
          </span>
        ) : (
          <span
            onClick={() => setPage("login")}
            style={{
              fontSize: "14px",
              cursor: "pointer",
              color: C.white,
              background: isActive("login") ? C.teal700 : C.teal500,
              padding: "6px 16px",
              borderRadius: "99px",
              fontWeight: "500",
              border: isActive("login")
                ? `1px solid ${C.teal300}`
                : "none"
            }}
          >
            Sign In
          </span>
        )}
      </div>
    </nav>
  );
}