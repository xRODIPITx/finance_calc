import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

function AdminLogin({ setToken }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/admin/main");
    }
  });
  const Log = async () => {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (password.length === 0) {
      document.getElementById("message").innerText = "Ошибка ввода данных";
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:9001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      if (response.status === 400) {
        document.getElementById("message").innerText = "Ошибка в вводе данных";
        return;
      }

      if (!response.ok) {
        document.getElementById("message").innerText =
          "Неверный логин или пароль";
        return;
      }

      navigate("/admin/main");
    } catch (err) {
      console.error(err);
      document.getElementById("message").innerText =
        "Ошибка подключения к серверу";
    }

    const data = {
      login: login,
      password: password,
    };

    const api = "http://localhost:9001/login";

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.token !== undefined) {
          localStorage.setItem("token", result.token);
          setToken(result.token);
          navigate("/admin/main");
        }
      });
  };

  return (
    <>
      <Header />
      <div className="AdminLogin">
        <p>Вход в панель администратора:</p>
        <input id="login" type="text" placeholder="Введите логин от админа" />
        <input
          id="password"
          type="password"
          placeholder="Введите пароль от админа"
        />
        <button id="login-button" onClick={Log}>
          Войти
        </button>
        <p id="message"></p>
      </div>
      <Footer />
    </>
  );
}

export default AdminLogin;
