import { useRef, useState, useContext } from "react";
import { SearchContext } from "../App";
import { IconContext } from "react-icons";
import { AiFillCaretDown } from "react-icons/ai";
import useHandleClickOutside from "../hooks/useHandleClickOutside";

const cityList = ["台北市", "新北市"] as const;

function Dropdowns() {
  const { searchTerm, handleSearchTermChange } = useContext(SearchContext);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useHandleClickOutside(selectRef, setIsOpenMenu);

  const handleOpen = () => {
    setIsOpenMenu((pre) => !pre);
  };

  const handleSelect = (city: (typeof cityList)[number]) => {
    handleSearchTermChange("city", city);
    setIsOpenMenu(false);
  };

  return (
    <div
      ref={selectRef}
      className="search__select__container text-btn"
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

      {isOpenMenu ? (
        <ul className="search__select__options">
          {cityList.map((city) => (
            <li
              key={city}
              onClick={(e) => {
                e.stopPropagation();
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
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default Dropdowns;
