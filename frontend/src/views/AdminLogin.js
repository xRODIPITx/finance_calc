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

    if (password.length === 0 || login.length === 0) {
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
        document.getElementById("message").innerText =
          "Неверный логин или пароль";
        return;
      }

      if (response.status === 404) {
        document.getElementById("message").innerText = "Сервер не найден";
        return;
      }

      if (!response.ok) {
        document.getElementById("message").innerText = "Ошибка авторизации";
        return;
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/admin/main");
      } else {
        document.getElementById("message").innerText =
          "Ошибка: сервер не вернул токен";
      }
    } catch (err) {
      console.error(err);
      document.getElementById("message").innerText =
        "Ошибка подключения к серверу";
    }
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
