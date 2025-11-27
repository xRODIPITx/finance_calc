import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  const siteName = "Финансовые калькуляторы";

  return (
    <div className="Footer">
      {year} {siteName}
    </div>
  );
}

export default Footer;
