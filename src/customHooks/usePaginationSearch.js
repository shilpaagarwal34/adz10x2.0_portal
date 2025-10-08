import { useState } from "react";

const useSearchPagination = (initialEntries = 10) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState(initialEntries);
  const [currentPage, setCurrentPage] = useState(1);

  // const handleSearchChange = (query) => {
  //   setSearchQuery(query);
  //   setCurrentPage(1);
  // };

  const handleSearchChange = (query) => {
    setSearchQuery((prev) => {
      if (prev !== query) {
        setCurrentPage(1);
      }
      return query;
    });
  };

  const handleEntriesChange = (value) => {
    setEntries(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    // console.log("Page changed to:", page);
    setCurrentPage(page);
  };

  return {
    searchQuery,
    entries,
    currentPage,
    setSearchQuery,
    setEntries,
    setCurrentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  };
};

export default useSearchPagination;
