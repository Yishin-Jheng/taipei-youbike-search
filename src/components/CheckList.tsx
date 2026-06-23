import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";
import distData from "../DistData";

function CheckList() {
  const { searchTerm, handleSearchTermChange } = useContext(SearchContext);
  const [checkedDistList, setCheckedDistList] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(true);
  const listItem = searchTerm.city
    ? (distData.find((obj) => obj.city === searchTerm.city)?.dist ?? [])
    : [];

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    if (checked) {
      setCheckedDistList((pre) => [...pre, id]);
      return;
    }
    setCheckedDistList((pre) => pre.filter((item) => item !== id));
  };

  const handleClickAll = () => {
    if (isCheckAll) {
      setIsCheckAll(false);
      setCheckedDistList([]);
      return;
    }
    setIsCheckAll(true);
    setCheckedDistList(listItem);
  };

  useEffect(() => {
    setIsCheckAll(true);
    setCheckedDistList(listItem);
  }, [searchTerm.city]);

  useEffect(() => {
    handleSearchTermChange("dist", checkedDistList);
  }, [checkedDistList]);

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
              checked={checkedDistList.includes(dist)}
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
