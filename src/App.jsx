import { useState } from "react";
import { css, C } from "./constants";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PageBanner } from "./components/UI";
import LoginPage    from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage    from "./pages/AdminPage";
import ProfilePage  from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin   = user => { setCurrentUser(user); setPage(user.role === "admin" ? "admin" : "profile"); };
  const handleSignOut = ()   => { setCurrentUser(null); setPage("login"); };

  const bannerProps = {
    admin: {
      title: "Admin Dashboard",
      subtitle: "Review and moderate submitted lake reports.",
    },
    profile: {
      title: `${currentUser?.username ?? ""} — Profile`,
      subtitle: "Your saved locations and activity.",
      actionLabel: "Sign Out",
      onActionClick: handleSignOut,
    },
  };

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        <Navbar page={page} setPage={setPage} currentUser={currentUser} />
        {(page === "admin" || page === "profile") && <PageBanner {...bannerProps[page]} />}
        <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
           {page === "home"     && <HomePage />}
          {/* {page === "about"     && <AboutPage />} */}
          {page === "login"    && <LoginPage    setPage={setPage} onLogin={handleLogin} />}
          {page === "register" && <RegisterPage setPage={setPage} onLogin={handleLogin} />}
          {page === "admin"    && <AdminPage />}
          {page === "profile"  && <ProfilePage currentUser={currentUser} />}
        </div>
        <Footer/>
      </div>
    </>
  );
}
