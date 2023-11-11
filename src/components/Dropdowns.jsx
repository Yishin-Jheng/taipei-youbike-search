import { useRef, useState, useEffect, useContext } from "react";
import { SearchContext } from "../App";
import { IconContext } from "react-icons";
import { AiFillCaretDown } from "react-icons/ai";

const cityList = [
  "台北市",
  "新北市",
  "桃園市",
  "新竹市",
  "新竹縣",
  "新竹科學園區",
  "苗栗縣",
  "台中市",
  "嘉義市",
  "台南市",
  "高雄市",
  "屏東縣",
];

function Dropdowns() {
  const { searchTerm, handleSearchTermChange } = useContext(SearchContext);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleOpen = function () {
    setIsOpen(!isOpen);
  };

  const handleSelect = function (city) {
    handleSearchTermChange("city", city);
  };

  const handleClickOutside = function (e) {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={selectRef}
      className="search__select__container  text-btn"
      onClick={handleOpen}
    >
      <div className="search__select">
        {searchTerm.city ? (
          <span className="search__select--active">{searchTerm.city}</span>
        ) : (
          <span>選擇縣市</span>
        )}
        <IconContext.Provider
          value={{
            size: "10px",
            color: `${searchTerm.city ? "#323232" : "#aeaeae"}`,
          }}
        >
          <AiFillCaretDown />
        </IconContext.Provider>
      </div>

      {isOpen ? (
        <ul className="search__select__options" onClick={handleOpen}>
          {cityList.map((city, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  handleSelect(city);
                }}
                className={`${
                  city === searchTerm.city
                    ? "search__select__options--active"
                    : ""
                }`}
              >
                {city}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default Dropdowns;
