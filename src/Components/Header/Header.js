import React, { useState } from "react";
import s from "./Header.module.css";
import Logo from "../../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
    setInput("");
  };

  return (
    <nav className={s.navbar}>
      <div className="container">
        <div className={s.nav_content}>
          <Link to="/">
            <img width={296} height={41} src={Logo} alt="" />
          </Link>
          <form onSubmit={handleSubmit} className={s.form_control}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
