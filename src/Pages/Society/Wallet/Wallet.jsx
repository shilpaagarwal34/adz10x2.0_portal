import React, { useEffect, useState } from "react";
import DateFilter from "../../../Components/Common/DateFilter";
import "../../../Pages/Styles/Society-Dashboard.css";
import WalletBalanceCard from "../../../Components/Company/Wallet/WalletBalanceCard.jsx";
import WalletTable from "../../../Components/Company/Wallet/WalletTable.jsx";

import { fetchSocietyDataTable } from "../../../store/Actions/Company/Wallet/WalletActions.js";
import { setDateFilter } from "../../../store/Slice/Company/Wallet/WalletSlice.js";
import { useDispatch, useSelector } from "react-redux";
import useSearchPagination from "../../../customHooks/usePaginationSearch.js";
import SearchAndFilter from "../../../Components/Common/SearchAndFilter.jsx";
import Pagination from "../../../Components/Common/Pagination.jsx";
import { fetchSocietyBalanceAmount } from "../../../store/Actions/Society/Payments/PaymentActions.js";
import SocietyTableSkeleton from "../../../Components/Skeletons/Admin/SocietyTableSkeleton.jsx";
import WalletBalanceCardSkeleton from "../../../Components/Skeletons/Company/Wallet/WalletBalanceCardSkeleton.jsx";

const Wallet = () => {
  const dispatch = useDispatch();
  const [walletAmount, setWalletAmount] = useState("");

  const { walletData, loading, error, from_date, to_date, totalRecords } =
    useSelector((state) => state.company.wallet);

  const { balanceAmount } = useSelector((state) => state.society.payments);

  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();

  useEffect(() => {
    dispatch(
      fetchSocietyDataTable({
        page: currentPage,
        pageSize: entries,
        searchQuery,
        from_date,
        to_date,
      })
    );
  }, [dispatch, currentPage, entries, searchQuery, from_date, to_date]);

  useEffect(() => {
    dispatch(fetchSocietyBalanceAmount());
  }, [dispatch]);

  return (
    <div className="pt-3 pb-5">
      <div className="row gap-3 mx-2 mx-sm-4">
        {/* Wallet Card */}
        {loading ? (
          <WalletBalanceCardSkeleton />
        ) : (
          <WalletBalanceCard walletAmount={balanceAmount} />
        )}
      </div>

      <DateFilter onDateFilter={(dates) => dispatch(setDateFilter(dates))} />

      <div className="card border-0 p-3 mx-2 mx-sm-4 mt-3">
        <SearchAndFilter
          onSearchChange={handleSearchChange}
          onEntriesChange={handleEntriesChange}
        />

        {loading ? (
          <SocietyTableSkeleton />
        ) : (
          <WalletTable
            walletData={walletData}
            error={error}
            page={currentPage}
            pageSize={entries}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalEntries={totalRecords}
          entriesPerPage={entries}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Wallet;
