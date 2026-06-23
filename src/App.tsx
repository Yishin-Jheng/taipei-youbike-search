import { createContext, useEffect, useState } from "react";
import fetchUbikeJson, { UBikeData } from "./fetchUbikeJson";
import Navigator from "./components/Navigator";
import Search from "./components/Search";
import Table from "./components/Table";

interface SearchTerm {
  city: string;
  siteName: string;
  dist: string[];
}

interface SearchContext {
  tableData: UBikeData[];
  searchTerm: SearchTerm;
  handleSearchTermChange: (
    key: keyof SearchTerm,
    value: string | string[],
  ) => void;
}

export const SearchContext = createContext<SearchContext>(null!);

function App() {
  const [tableData, setTableData] = useState<UBikeData[]>([]);
  const [searchTerm, setSearchTerm] = useState<SearchTerm>({
    city: "",
    siteName: "",
    dist: [],
  });

  const handleSearchTermChange = (
    key: keyof SearchTerm,
    value: string | string[],
  ) => {
    setSearchTerm((pre) => ({ ...pre, [key]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchUbikeJson();
        setTableData(result);
      } catch (err) {
        console.error(err);
        alert(`⚠️資料加載失敗`);
      }
    };

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
