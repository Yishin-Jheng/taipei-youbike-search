import _ from "lodash";
import { useContext, useMemo, useState } from "react";
import { SearchContext } from "../App";
import { IconContext } from "react-icons";
import { MdDirectionsBike } from "react-icons/md";
import { WiWindy } from "react-icons/wi";

function Table() {
  const { tableData, searchTerm } = useContext(SearchContext);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const sortedData = _.orderBy(
    tableData,
    [(site) => parseInt(site[sortKey])],
    [sortOrder],
  );
  const currentTableData = useMemo(
    () =>
      sortedData.filter(
        (site) =>
          searchTerm.dist.includes(site.dist) &&
          site.stationName.includes(searchTerm.siteName),
      ),
    [sortedData, searchTerm.dist, searchTerm.siteName],
  );

  const handleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder("asc");
    }
    if (sortKey === key && sortOrder === "asc") {
      setSortOrder("desc");
    }
    if (sortKey === key && sortOrder === "desc") {
      setSortKey("");
      setSortOrder("");
    }
  };

  return (
    <section className="table padding-x">
      <div className="table__container">
        <div className="table__row table__row--thead">
          <div className="table__cell table__cell--th">縣市</div>
          <div className="table__cell table__cell--th">區域</div>
          <div className="table__cell table__cell--th">站點名稱</div>
          <div
            className="table__cell table__cell--th table__cell--sort"
            onClick={() => handleSort("availableRentBikes")}
          >
            可借車輛
          </div>
          <div
            className="table__cell table__cell--th table__cell--sort"
            onClick={() => handleSort("availableReturnBikes")}
          >
            可還空位
          </div>
        </div>
        {!!currentTableData.length &&
          currentTableData.map((site) => {
            return (
              <div key={site.id} className="table__row">
                <div className="table__cell">{searchTerm.city}</div>
                <div className="table__cell">{site.dist}</div>
                <div className="table__cell">{site.stationName}</div>
                <div className="table__cell table__cell--number">
                  {site.availableRentBikes}
                </div>
                <div className="table__cell table__cell--number">
                  {site.availableReturnBikes}
                </div>
              </div>
            );
          })}
        {!currentTableData.length && (
          <>
            <div className="table__row">
              <div className="table__cell"></div>
            </div>
            <div className="table__row">
              <div className="table__cell table__cell--icon">
                <IconContext.Provider
                  value={{
                    size: "33px",
                    color: "#b5cc22",
                  }}
                >
                  <WiWindy />
                  <MdDirectionsBike />
                </IconContext.Provider>
              </div>
            </div>
            <div className="table__row">
              <div className="table__cell"></div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Table;
