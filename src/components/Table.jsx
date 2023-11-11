import _ from "lodash";
import { useContext, useState } from "react";
import { SearchContext } from "../App";
import { IconContext } from "react-icons";
import { MdDirectionsBike } from "react-icons/md";
import { WiWindy } from "react-icons/wi";

function Table() {
  const { tableData, searchTerm } = useContext(SearchContext);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const sortedData = _.orderBy(
    tableData,
    [(site) => parseInt(site[sortKey])],
    [sortOrder]
  );
  const currentData = searchTerm.siteName
    ? sortedData.filter(
        (site) =>
          searchTerm.dist.includes(site.sarea) &&
          site.sna.includes(searchTerm.siteName)
      )
    : sortedData.filter((site) => searchTerm.dist.includes(site.sarea));

  const handleSort = (key) => {
    if (sortKey === key) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortKey(null);
        setSortOrder(null);
      }
    } else {
      setSortKey(key);
      setSortOrder("asc");
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
            onClick={() => handleSort("sbi")}
          >
            可借車輛
          </div>
          <div
            className="table__cell table__cell--th table__cell--sort"
            onClick={() => handleSort("bemp")}
          >
            可還空位
          </div>
        </div>

        {currentData.length ? (
          currentData.map((site) => {
            return (
              <div key={site.sno} className="table__row">
                <div className="table__cell">{searchTerm.city}</div>
                <div className="table__cell">{site.sarea}</div>
                <div className="table__cell">{site.sna.split("_")[1]}</div>
                <div className="table__cell table__cell--number">
                  {site.sbi}
                </div>
                <div className="table__cell table__cell--number">
                  {site.bemp}
                </div>
              </div>
            );
          })
        ) : (
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
