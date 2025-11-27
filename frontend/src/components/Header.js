import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/admin");
  };

  const AdminButtons = () => {
    if (isLoggedIn === true) {
      return (
        <button onClick={signOut} className="signOutButton">
          Выход из аккаунта
        </button>
      );
    } else {
      return (
        <button className="adminButton" onClick={() => navigate("/admin/")}>
          Панель администратора
        </button>
      );
    }
  };

  return (
    <div className="Header">
      <a onClick={signOut} href="/">
        Финансовый калькулятор
      </a>
      <AdminButtons />
    </div>
  );
}

export default Header;
