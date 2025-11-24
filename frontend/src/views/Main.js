import "./Main.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CalcList from "../components/CalcList";
import { useEffect, useState } from "react";

function Main() {
  const [calc, setCalc] = useState([]);

  useEffect(() => {
    const api = "http://127.0.0.1:9001/calculator/get/all";

    fetch(api)
      .then((result) => result.json())
      .then((result) => {
        // console.debug(result.data)
        setCalc(result.data);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="Main">
        {calc.map((item) => (
          <CalcList id={item._id} key={item._id} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Main;
