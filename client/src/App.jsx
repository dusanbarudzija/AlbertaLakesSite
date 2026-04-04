import { useState, useEffect } from "react";
import { css, C } from "./constants";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PageBanner } from "./components/UI";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import { getMe, logout } from "./services/dataService";

export default function App() {
  const [page, setPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [profileSelectedLakeId, setProfileSelectedLakeId] = useState(null);
  const [lakes, setLakes] = useState([]);
  const [selectedLake, setSelectedLake] = useState(null);
  const [detailLake, setDetailLake] = useState(null);

  useEffect(() => {
    getMe()
      .then(data => setCurrentUser(data.user))
      .catch(() => {});
    const handle404 = () => setPage("404");
    window.addEventListener("api-not-found", handle404);
    return () => window.removeEventListener("api-not-found", handle404);
  }, []);

  const handleLogin = user => { setCurrentUser(user); setPage(user.role === "admin" ? "admin" : "profile"); };
  const handleSignOut = () => { logout().catch(() => {}); setCurrentUser(null); setPage("login"); };

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
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar page={page} setPage={setPage} currentUser={currentUser} />
        {(page === "admin" || page === "profile") && <PageBanner {...bannerProps[page]} />}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: page === "home" ? "flex" : "none", flexDirection: "column", flex: 1 }}>
            <HomePage
              currentUser={currentUser}
              setPage={setPage}
              profileSelectedLakeId={profileSelectedLakeId}
              setProfileSelectedLakeId={setProfileSelectedLakeId}
              lakes={lakes}
              setLakes={setLakes}
              selectedLake={selectedLake}
              setSelectedLake={setSelectedLake}
              detailLake={detailLake}
              setDetailLake={setDetailLake}
            />
          </div>
          {page === "about" && <AboutPage />}
          {page === "login" && <LoginPage setPage={setPage} onLogin={handleLogin} />}
          {page === "register" && <RegisterPage setPage={setPage} onLogin={handleLogin} />}
          {page === "admin" && <AdminPage />}
          {page === "profile" && <ProfilePage currentUser={currentUser} setPage={setPage} setProfileSelectedLakeId={setProfileSelectedLakeId} />}
          {!["home", "about", "login", "register", "admin", "profile"].includes(page) && (
            <NotFoundPage setPage={setPage} />
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
