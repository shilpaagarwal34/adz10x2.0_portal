import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { downloadFile, downloadInvoice } from "../../../../helper/helper.js";
import { base_url } from "../../../../config/api.js";

export default function CompanyPaymentTable({ data, page, limit }) {
  return (
    <>
    <div className="table-responsive">
    <Table style={{ minWidth: "1050px" }}>
      <TableHead>
        <TableRow>
          <TableCell>Sr. No</TableCell>
          <TableCell>Payment Date & Time </TableCell>
          <TableCell>Payment ID</TableCell>
          <TableCell>Company Name</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>GST Amount</TableCell>
          <TableCell>Total Amount</TableCell>
          <TableCell>Invoice</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((row, index) => (
          <TableRow key={row.id} sx={{ height: "40px" }}>
            <TableCell sx={{ paddingY: "4px " }}>
               {(page - 1) * limit + index + 1}
            </TableCell>
            <TableCell sx={{ paddingY: "4px " }}>{row.date}</TableCell>
            <TableCell sx={{ paddingY: "4px " }}>
              {row.transaction_id}
            </TableCell>
            <TableCell sx={{ paddingY: "4px " }}>{row.company_name}</TableCell>
            <TableCell sx={{ paddingY: "4px " }}>₹{row.amount}</TableCell>
            <TableCell sx={{ paddingY: "4px " }}>₹{row.gst_amount}</TableCell>
            <TableCell sx={{ paddingY: "4px " }}>₹{row.total_amount}</TableCell>
            <TableCell sx={{ paddingY: "4px " }}>
              <button
                className="cp-invoice-btn"
                onClick={() =>
                  downloadInvoice(`${base_url}/${row?.invoice_url_path}`)
                }
              >
                <svg
                  className="me-1"
                  width="15"
                  height="12"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 0H16C16.5304 0 17.0391 0.19715 17.4142 0.548079C17.7893 0.899009 18 1.37497 18 1.87126V14.9701C18 16.0086 17.11 16.8413 16 16.8413H2C1.46957 16.8413 0.960859 16.6442 0.585786 16.2933C0.210714 15.9423 0 15.4664 0 14.9701V1.87126C0 0.842067 0.9 0 2 0ZM5 13.0988H13V11.2276H5V13.0988ZM13 6.54941H10.5V2.80689H7.5V6.54941H5L9 10.2919L13 6.54941Z"
                    fill="#01a743"
                  />
                </svg>
                Download Receipt
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    </>
  );
}
