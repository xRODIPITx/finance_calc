import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AdminCalcEdit.css";

function AdminCalcEdit() {
  const { id } = useParams();
  const [token, setToken] = useState("");
  const [calc, setCalc] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));

    if (token === null) {
      navigate("/admin");
    }

    const api = `http://127.0.0.1:9001/calculator/get/one/` + id;

    fetch(api)
      .then((res) => res.json())
      .then((result) => {
        // console.debug(result)
        setCalc(result.data);
      });
  }, [token, navigate, id]);

  const changeCalc = async () => {
    const calcName = document.getElementById("name").value;
    const percent = document.getElementById("percent").value;

    if (token !== null) {
      const api = "http://127.0.0.1:9001/calculator/edit/" + id;
      const calculator = {
        calcName,
        percent,
      };
      const data = {
        token,
        calculator,
      };

      await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .then((result) => {
          document.getElementById("message").innerText = result.message;
        });
    }
  };

  return (
    <>
      <Header />
      <div className="AdminCalcEdit">
        <p>Изменить калькулятор:</p>

        <input
          id="name"
          type="text"
          placeholder="Имя калькулятора"
          defaultValue={calc.calcName}
        />
        <input
          id="percent"
          type="number"
          placeholder="Процент кредита"
          defaultValue={calc.percent}
        />
        <button id="create" onClick={changeCalc}>
          Создать
        </button>
        <Link to="/admin/main" className="returnButton">
          Назад к списку
        </Link>
        <p id="message"></p>
      </div>
      <Footer />
    </>
  );
}

export default AdminCalcEdit;
