import { Link } from "react-router-dom";
import "./CalcList.css";
import { useEffect, useState } from "react";

function CalcList({ id }) {
  const [calc, setCalc] = useState({});

  useEffect(() => {
    const api = `http://127.0.0.1:9001/calculator/get/one/` + id;

    fetch(api)
      .then((res) => res.json())
      .then((result) => {
        setCalc(result.data);
      });
  });

  return (
    <div className="CalcItem">
      <p>{calc.calcName}</p>
      <Link to={`/CalcInt/${calc._id}`} className="btn">
        Открыть
      </Link>
    </div>
  );
}

export default CalcList;
