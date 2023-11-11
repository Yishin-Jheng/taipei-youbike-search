import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";
import distData from "../DistData";

function CheckList() {
  const { searchTerm, handleSearchTermChange } = useContext(SearchContext);
  const [isCheck, setIsCheck] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(true);
  const listItem = searchTerm.city
    ? distData.filter((obj) => obj.city === searchTerm.city)[0].dist
    : [];

  const handleClick = function (e) {
    const { id, checked } = e.target;
    if (checked) {
      setIsCheck([...isCheck, parseInt(id)]);
    } else {
      setIsCheck(isCheck.filter((i) => i !== parseInt(id)));
    }
  };

  const handleClickAll = function () {
    setIsCheckAll(!isCheckAll);
    if (isCheckAll) {
      setIsCheck([]);
    } else {
      setIsCheck(listItem.map((item, i) => i));
    }
  };

  useEffect(() => {
    setIsCheck(listItem.map((item, i) => i));
    setIsCheckAll(true);
  }, [searchTerm.city]);

  useEffect(() => {
    handleSearchTermChange(
      "dist",
      listItem.filter((item, i) => isCheck.includes(i))
    );
  }, [isCheck]);

  return (
    <div className="search__checkbox--group">
      <label
        className="search__checkbox search__checkbox--checkall"
        htmlFor="checkbox-all"
      >
        <input
          id="checkbox-all"
          type="checkbox"
          checked={isCheckAll}
          onChange={handleClickAll}
        />
        <span className="checkmark"></span>

        <p className="text-m">全部勾選</p>
      </label>

      {listItem.map((item, i) => {
        return (
          <label key={i} className="search__checkbox" htmlFor={i}>
            <input
              id={i}
              type="checkbox"
              checked={isCheck.includes(i)}
              onChange={handleClick}
            />
            <span className="checkmark"></span>

            <p className="text-m">{item}</p>
          </label>
        );
      })}
    </div>
  );
}

export default CheckList;
