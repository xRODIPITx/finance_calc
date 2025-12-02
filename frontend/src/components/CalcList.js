import { Link } from "react-router-dom";
import "./CalcList.css";
import { useEffect, useState } from "react";

function CalcList() {
  const [calcs, setCalcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api = "http://127.0.0.1:9001/calculator/get/all";

    fetch(api)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки");
        return res.json();
      })
      .then((result) => {
        setCalcs(result.data || []);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="message">Загрузка...</p>;
  if (error) return <p className="message">Ошибка: {error}</p>;

  return (
    <div className="CalcList">
      {calcs.length === 0 && <p>Нет калькуляторов для отображения</p>}

      {calcs.map((calc) => (
        <div className="CalcItem" key={calc._id}>
          <p>{calc.calcName}</p>
          <Link to={`/CalcInt/${calc._id}`} className="btn">
            Перейти
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CalcList;
