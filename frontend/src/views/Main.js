import "./Main.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CalcList from "../components/CalcList";

function Main() {
  return (
    <>
      <Header />
      <div className="Main">
        <CalcList />
      </div>
      <Footer />
    </>
  );
}

export default Main;
