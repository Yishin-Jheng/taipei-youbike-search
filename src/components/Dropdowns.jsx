import { useRef, useState, useEffect, useContext } from "react";
import { SearchContext } from "../App";
import { IconContext } from "react-icons";
import { AiFillCaretDown } from "react-icons/ai";
import useHandleClickOutside from "../hooks/useHandleClickOutside";

const cityList = ["台北市", "新北市"];

function Dropdowns() {
  const { searchTerm, handleSearchTermChange } = useContext(SearchContext);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  useHandleClickOutside(selectRef, setIsOpen);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (city) => {
    handleSearchTermChange("city", city);
  };

  return (
    <div
      ref={selectRef}
      className="search__select__container  text-btn"
      onClick={handleOpen}
    >
      <div className="search__select">
        {searchTerm.city && (
          <span className="search__select--active">{searchTerm.city}</span>
        )}
        {!searchTerm.city && <span>選擇縣市</span>}
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
                key={city}
                onClick={() => handleSelect(city)}
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
