import { Link } from "react-router-dom";
import "./CalcList.css";
import { useEffect, useState } from "react";

function CalcList({ id }) {
  const [calc, setCalc] = useState({});

  useEffect(() => {
    const api = `http://127.0.0.1:9001/calculator/get/one/` + id;

    fetch(api)
      .then((result) => result.json())
      .then((result) => {
        setCalc(result.data);
      });
  }, [id]);

  return (
    <div className="CalcItem">
      <p>{calc.calcName}</p>
      {calc._id && (
        <Link to={`/CalcInt/${calc._id}`} className="btn">
          Открыть
        </Link>
      )}
    </div>
  );
}

export default CalcList;
