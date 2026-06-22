import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";
import distData from "../DistData";

function CheckList() {
  const { searchTerm, handleSearchTermChange } = useContext(SearchContext);
  const [isCheckedDist, setIsCheckedDist] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(true);
  const listItem = searchTerm.city
    ? distData.filter((obj) => obj.city === searchTerm.city).at(0).dist
    : [];

  const handleClick = function (e) {
    const { id, checked } = e.target;

    if (checked) {
      setIsCheckedDist((pre) => [...pre, id]);
      return;
    }
    setIsCheckedDist((pre) => pre.filter((item) => item !== id));
  };

  const handleClickAll = function () {
    setIsCheckAll((pre) => !pre);

    if (isCheckAll) {
      setIsCheckedDist([]);
      return;
    }
    setIsCheckedDist(listItem);
  };

  useEffect(() => {
    setIsCheckAll(true);
    setIsCheckedDist(listItem);
  }, [searchTerm.city]);

  useEffect(() => {
    handleSearchTermChange(
      "dist",
      listItem.filter((item) => isCheckedDist.includes(item)),
    );
  }, [isCheckedDist]);

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

      {listItem.map((dist) => {
        return (
          <label key={dist} className="search__checkbox" htmlFor={dist}>
            <input
              id={dist}
              type="checkbox"
              checked={isCheckedDist.includes(dist)}
              onChange={handleClick}
            />
            <span className="checkmark"></span>

            <p className="text-m">{dist}</p>
          </label>
        );
      })}
    </div>
  );
}

export default CheckList;
