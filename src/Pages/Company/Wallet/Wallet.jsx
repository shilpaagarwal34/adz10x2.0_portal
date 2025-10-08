import { useEffect, useState } from "react";
import DateFilter from "../../../Components/Common/DateFilter";
import "../../../Pages/Styles/Society-Dashboard.css";
import WalletBalanceCard from "../../../Components/Company/Wallet/WalletBalanceCard.jsx";
import AddFundCard from "../../../Components/Company/Wallet/AddFundCard.jsx";
import WalletTable from "../../../Components/Company/Wallet/WalletTable.jsx";

import {
  fetchWalletData,
  fetchWalletAmount,
} from "../../../store/Actions/Company/Wallet/WalletActions.js";
import { setDateFilter } from "../../../store/Slice/Company/Wallet/WalletSlice.js";
import { useDispatch, useSelector } from "react-redux";
import useSearchPagination from "../../../customHooks/usePaginationSearch.js";
import SearchAndFilter from "../../../Components/Common/SearchAndFilter.jsx";
import Pagination from "../../../Components/Common/Pagination.jsx";
import WalletBalanceCardSkeleton from "../../../Components/Skeletons/Company/Wallet/WalletBalanceCardSkeleton.jsx";
import AddFundCardSkeleton from "../../../Components/Skeletons/Company/Wallet/AddFundCardSkeleton.jsx";
import DateFilterSkeleton from "../../../Components/Skeletons/Company/Wallet/DateFilterSkeleton.jsx";
import SocietyTableSkeleton from "../../../Components/Skeletons/Admin/SocietyTableSkeleton.jsx";
import PaginationSkeleton from "../../../Components/Skeletons/PaginationSkeleton.jsx";

const Wallet = () => {
  const dispatch = useDispatch();
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [walletAmount, setWalletAmount] = useState("");

  const {
    walletData,
    loading,
    error,
    from_date,
    to_date,
    totalRecords,
    refreshFlag,
  } = useSelector((state) => state.company.wallet);

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
      fetchWalletData({
        page: currentPage,
        pageSize: entries,
        searchQuery,
        from_date,
        to_date,
      })
    );
  }, [dispatch, currentPage, entries, searchQuery, from_date, to_date]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingBalance(true);
      try {
        const result = await fetchWalletAmount();
        setWalletAmount(result.wallet_amount); // Assuming result contains the amount you want
      } catch (err) {
        console.error("Failed to fetch wallet amount", err);
      } finally {
        setLoadingBalance(false);
      }
    };

    fetchData();
  }, [refreshFlag]);

  return (
    <div className="pt-3 pb-5">
      <div className="row gap-3 mx-2 mx-sm-4">
        {/* Wallet Card */}
        {loadingBalance ? (
          <WalletBalanceCardSkeleton />
        ) : (
          <WalletBalanceCard walletAmount={walletAmount} />
        )}

        {/* Add Fund Card */}
        {loadingBalance ? <AddFundCardSkeleton /> : <AddFundCard />}
      </div>

      {loadingBalance ? (
        <DateFilterSkeleton />
      ) : (
        <DateFilter onDateFilter={(dates) => dispatch(setDateFilter(dates))} />
      )}

      <div className="card border-0 p-3 mx-2 mx-sm-4 mt-3">
        <SearchAndFilter
          onSearchChange={handleSearchChange}
          onEntriesChange={handleEntriesChange}
          entries={entries}
          searchQuery={searchQuery}
        />

        {loading ? (
          <SocietyTableSkeleton />
        ) : (
          <WalletTable
            walletData={walletData}
            loading={loading}
            error={error}
            page={currentPage}
            pageSize={entries}
          />
        )}

        {loading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalEntries={totalRecords}
            entriesPerPage={entries}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Wallet;
