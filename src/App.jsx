import { createContext, useEffect, useState } from "react";
import fetchJSON from "./FetchData";
import Navigator from "./components/Navigator";
import Search from "./components/Search";
import Table from "./components/Table";
export const SearchContext = createContext();

function App() {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    city: "",
    siteName: "",
    dist: [],
  });

  const handleSearchTermChange = function (key, value) {
    setSearchTerm({ ...searchTerm, [key]: value });
  };

  const fetchData = async function () {
    try {
      const dataTP = await fetchJSON(
        "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
      );
      const dataNTP = await fetchJSON(
        "https://data.ntpc.gov.tw/api/datasets/010e5b15-3823-4b20-b401-b1cf000550c5/json?size=1000"
      );

      setTableData([...dataTP, ...dataNTP]);
    } catch (err) {
      console.error(err);
      alert(`⚠️資料加載失敗`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SearchContext.Provider
      value={{ tableData, searchTerm, handleSearchTermChange }}
    >
      <Navigator />
      <Search />
      <Table />
    </SearchContext.Provider>
  );
}

export default App;
