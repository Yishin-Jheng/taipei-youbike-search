import { createContext, useEffect, useState } from "react";
import fetchUbikeJson from "./fetchUbikeJson";
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
      const result = await fetchUbikeJson();
      setTableData(result);
    } catch (err) {
      console.error(err);
      alert(`⚠️資料加載失敗`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navigator />
      <SearchContext.Provider
        value={{ tableData, searchTerm, handleSearchTermChange }}
      >
        <Search />
        <Table />
      </SearchContext.Provider>
    </>
  );
}

export default App;
