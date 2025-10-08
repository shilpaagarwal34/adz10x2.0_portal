// File: components/UserView.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../store/Actions/Admin/SystemUser/SystemUserActions.js";
import UserTable from "../../../Components/Admin/System Users/UserTable.jsx";
import useSearchPagination from "../../../customHooks/usePaginationSearch.js";

const UserView = () => {
  const dispatch = useDispatch();

  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();

  const { users, total, loading, tableName } = useSelector(
    (state) => state.admin.system_user
  );

  useEffect(() => {
    dispatch(
      fetchUsers({ page: currentPage, limit: entries, search: searchQuery })
    );
  }, [currentPage, entries, searchQuery, dispatch, total]);

  return (
    <>
      <CardContent className="m-2">
        <UserTable
          users={users}
          loading={loading}
          total={total}
          tableName={tableName}
          page={currentPage}
          limit={entries}
          handlePageChange={handlePageChange}
          handleSearchChange={handleSearchChange}
          handleEntriesChange={handleEntriesChange}
          search={searchQuery}
        />
      </CardContent>
    </>
  );
};

export default UserView;
