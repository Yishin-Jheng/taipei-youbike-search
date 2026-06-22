import {
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
  Fragment,
} from "react";
import { SearchContext } from "../App";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import useHandleClickOutside from "../hooks/useHandleClickOutside";

function Input() {
  const { tableData, searchTerm, handleSearchTermChange } =
    useContext(SearchContext);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  useHandleClickOutside(inputRef, setIsOpen);

  const currentTableData = useMemo(() => {
    const isSearchedDist = (item) => searchTerm.dist.includes(item);
    return tableData.filter((site) => isSearchedDist(site.dist));
  }, [tableData, searchTerm.dist]);
  const optionList = currentTableData.filter((site) =>
    site.stationName.includes(input),
  );

  const handleClear = () => {
    setInput("");
    setIsOpen(false);
    handleSearchTermChange("siteName", "");
  };

  const handleClickOption = (name) => {
    setInput(name);
    setIsOpen(false);
    handleSearchTermChange("siteName", name);
  };

  return (
    <div ref={inputRef} className="search__input__container">
      <input
        className="search__input text-btn"
        type="text"
        placeholder="搜尋站點"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            handleSearchTermChange("siteName", e.target.value);
          }
        }}
        onFocus={() => setIsOpen(true)}
      />
      <div className="search__input__icon" onClick={handleClear}>
        <IconContext.Provider
          value={{
            size: "15px",
            color: `${input ? "#b5cc22" : "#aeaeae"}`,
          }}
        >
          <AiOutlineClose />
        </IconContext.Provider>
      </div>

      {isOpen && !!optionList.length && (
        <ul className="search__select__options">
          {optionList.map((site, i) => {
            const name = site.stationName;
            const parts = name.split(input);
            const autoCompName = parts.map((part, i) =>
              i < parts.length - 1 ? (
                <Fragment key={`${site.id}-${part}-${i}`}>
                  {part}
                  <span className="highlight">{input}</span>
                </Fragment>
              ) : (
                part
              ),
            );

            return (
              <li key={site.id} onClick={() => handleClickOption(name)}>
                {autoCompName}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Input;
