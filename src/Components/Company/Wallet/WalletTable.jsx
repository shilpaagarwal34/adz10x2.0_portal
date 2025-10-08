// WalletTable.js

import { Table } from "react-bootstrap";

import {
  formatNumberWithCommas,
  formatToTitleCase,
} from "../../../helper/helper.js";

export default function WalletTable({
  walletData,
  error,
  page,
  pageSize,
}) {

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="table-responsive">
        <Table bordered className="custom-label" style={{ minWidth: "1000px" }}>
          <thead>
            <tr className="striped-thead">
              <th>Sr No.</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Descriptions</th>
              <th>Last Balance</th>
            </tr>
          </thead>

          <tbody>
            {walletData?.map((data, index) => (
              <tr key={index}>
                <td>{(page - 1) * pageSize + index + 1}</td>
                <td>{data.date}</td>
                <td>{formatToTitleCase(data.wallet_type)}</td>
                <td>{formatNumberWithCommas(data?.amount || 0)}</td>
                <td>{data.description}</td>
                <td>{data?.balance && formatNumberWithCommas(data.balance)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
