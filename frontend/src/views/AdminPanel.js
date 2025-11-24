import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./AdminPanel.css";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const [token, setToken] = useState("");
  const [calcs, setCalcs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));

    if (token === null) {
      navigate("/admin");
    }

    const calcsApi = "http://127.0.0.1:9001/calculator/get/all";

    fetch(calcsApi)
      .then((result) => result.json())
      .then((result) => {
        // console.debug(result.data)
        setCalcs(result.data);
      });
  }, [token, navigate]);

  const addCalc = async () => {
    const calcName = document.getElementById("name").value;
    const percent = document.getElementById("percent").value;

    if (token !== null) {
      const api = "http://127.0.0.1:9001/calculator/add";
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
          window.location.reload();
        });
    }
  };

  const deleteCalc = async (id) => {
    if (token !== null) {
      const api = "http://127.0.0.1:9001/calculator/delete/" + id;

      const data = {
        token,
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
          window.location.reload();
        });
    }
  };

  const editCalc = async (id) => {
    navigate("/admin/edit/" + id);
  };

  return (
    <>
      <Header />
      <div className="AdminPanel">
        <p>Создать калькулятор:</p>
        <input id="name" type="text" placeholder="Имя калькулятора" />
        <input id="percent" type="number" placeholder="Процент кредита" />
        <button id="create" onClick={addCalc}>
          Создать
        </button>
        <div className="calcList">
          {calcs.map((item) => (
            <div className="calcItem" key={item._id}>
              <p>Имя калькулятора: {item.calcName}</p>
              <p>Процент: {item.percent}</p>
              <button onClick={() => deleteCalc(item._id)}>
                Удалить калькулятор
              </button>
              <button onClick={() => editCalc(item._id)}>
                Изменить калькулятор
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminPanel;
