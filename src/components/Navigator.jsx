import { useState } from "react";
import ubike from "../assets/ubike.svg";

const navBtnArr = [1, 2, 3];
const navLinkList = [
  { id: 1, name: "使用說明" },
  { id: 2, name: "收費方式" },
  { id: 3, name: "站點資訊" },
  { id: 4, name: "最新消息" },
  { id: 5, name: "活動專區" },
];

function Navigator() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isActive, setIsActive] = useState(3);

  const handleClick = function (id) {
    setIsActive(id);
  };

  return (
    <nav className="nav padding-x">
      <img className="nav__icon" src={ubike} />
      <div className={`nav__list ${isNavOpen ? "nav__list--open" : ""}`}>
        {navLinkList.map((link) => {
          return (
            <div
              key={link.id}
              className={`nav__list__link ${
                isActive === link.id ? "nav__list__link--active" : ""
              }`}
              onClick={() => {
                handleClick(link.id);
              }}
            >
              <span className="text-m">{link.name}</span>
            </div>
          );
        })}

        <div className="btn text-btn">登入</div>
      </div>

      <div
        className="nav__minimize"
        onClick={() => {
          setIsNavOpen(!isNavOpen);
        }}
      >
        {navBtnArr.map((num) => {
          return (
            <span
              key={num}
              className={`nav__minimize__icon-${num} ${
                isNavOpen ? `nav__minimize__icon-${num}--active` : ""
              }`}
            >
              &nbsp;
            </span>
          );
        })}
      </div>
    </nav>
  );
}

export default Navigator;
