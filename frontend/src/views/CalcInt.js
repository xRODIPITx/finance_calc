import Header from "../components/Header";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import "./CalcInt.css";
import { useParams } from "react-router-dom";

function CalcInt() {
  const { id } = useParams();
  const [calc, setCalc] = useState({});
  const [result, setResult] = useState({
    price: 0,
    commonPercent: 0,
    sumPerMonth: 0,
    neededMoney: 0,
  });

  useEffect(() => {
    const api = `http://127.0.0.1:9001/calculator/get/one/` + id;

    fetch(api)
      .then((res) => res.json())
      .then((result) => {
        // console.debug(result)
        setCalc(result.data);
      });
  }, [id]);

  const calculate = (event) => {
    const percent = calc.percent;
    const time = document.getElementById("time").value;
    const sum = document.getElementById("sum").value;
    const firstSum = document.getElementById("firstSum").value;

    const price = sum - firstSum;
    const percentPerMonth = percent / 12 / 100;
    const commonPercent = (1 + percentPerMonth) ** (time * 12);
    const sumPerMonth =
      (price * percentPerMonth * commonPercent) / (commonPercent - 1);
    const neededMoney = sumPerMonth * 2.5;

    setResult({
      price,
      time,
      commonPercent: commonPercent.toFixed(2),
      sumPerMonth: Math.round(sumPerMonth),
      neededMoney: Math.round(neededMoney),
    });
  };

  const Result = () => {
    if (result.price <= 0 || result.time <= 0) {
      return (
        <>
          <p>Заполните все поля для выполнения расчета</p>
        </>
      );
    } else {
      return (
        <>
          <p>Стоимость кредита: {result.price} руб.</p>
          <p>Общая ставка кредита: {result.commonPercent}%</p>
          <p>Ежемесячный платёж: {result.sumPerMonth} руб.</p>
          <p>Необходимый доход: {result.neededMoney} руб.</p>
        </>
      );
    }
  };

  return (
    <>
      <Header />
      <div className="CalcInt">
        <p>{calc.CalcName}</p>
        <input id="sum" type="number" placeholder="Сумма (руб)" />
        <input id="time" type="number" placeholder="Продолжительность (лет)" />
        <input
          id="firstSum"
          type="number"
          placeholder="Изначальная сумма (руб)"
        />
        <button id="result" onClick={calculate}>
          Вычислить
        </button>
        <Result />
      </div>
      <Footer />
    </>
  );
}

export default CalcInt;
