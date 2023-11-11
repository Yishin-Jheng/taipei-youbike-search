import { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../App";
import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";

function Input() {
  const { tableData, searchTerm, handleSearchTermChange } =
    useContext(SearchContext);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const currentData = tableData.filter((site) =>
    searchTerm.dist.includes(site.sarea)
  );

  const handleChange = function (e) {
    setInput(e.target.value);
    handleSearchTermChange("siteName", e.target.value);

    if (e.target.value.length && currentData.length) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleClear = function () {
    setInput("");
    setIsOpen(false);
    handleSearchTermChange("siteName", "");
  };

  const handleClick = function (name) {
    setInput(name);
    handleSearchTermChange("siteName", name);
  };

  useEffect(() => {
    const handleClickOutside = function (e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={inputRef} className="search__input__container">
      <input
        className="search__input  text-btn"
        type="text"
        placeholder="搜尋站點"
        value={input}
        onChange={handleChange}
      />
      <div className="search__input__icon" onClick={handleClear}>
        <IconContext.Provider
          value={{
            size: "15px",
            color: `${input ? "#b5cc22" : "#aeaeae"}`,
          }}
        >
          <AiOutlineSearch />
        </IconContext.Provider>
      </div>

      {isOpen ? (
        <ul className="search__select__options">
          {currentData
            .filter((site) => site.sna.includes(input))
            .map((site, i) => {
              const name = site.sna.split("_")[1];
              const parts = name.split(input);
              const autoCompName = parts.map((part, i) =>
                i < parts.length - 1 ? (
                  <>
                    {part}
                    <span className="highlight">{input}</span>
                  </>
                ) : (
                  part
                )
              );

              return (
                <li
                  key={i}
                  onClick={() => {
                    handleClick(name);
                  }}
                >
                  {autoCompName}
                </li>
              );
            })}
        </ul>
      ) : null}
    </div>
  );
}

export default Input;
