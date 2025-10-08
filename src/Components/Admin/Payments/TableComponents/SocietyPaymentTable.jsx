import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { formatNumberWithCommas } from "../../../../helper/helper.js";
import PendingPaymentModal from "../Modal/PendingPaymentModal.jsx";
import api_routes from "../../../../config/api.js";
import axiosInstance from "../../../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SocietyPaymentTable({
  data,
  activeTab,
  page,
  limit,
  setActiveTab,
}) {
  const [show, setShow] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleShow = async (invoiceId) => {
    setIsLoading(true);
    setShow(true);

    try {
      const response = await axiosInstance.get(
        `${api_routes.admin.view_society_payment}/${invoiceId}`
      );

      if (response.status === 200) {
        setSelectedPayment(response?.data?.data);
      } else {
        toast.error("Failed to fetch payment data");
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <div className="table-responsive">
        <Table style={{ minWidth: "1000px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>
              {activeTab === 1 && (
                <>
                  <TableCell>Paid Date</TableCell>
                  <TableCell>Transaction ID</TableCell>
                </>
              )}
              <TableCell>Invoice No</TableCell>
              <TableCell>Society Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow key={row.id} sx={{ height: "40px" }}>
                <TableCell sx={{ paddingY: "4px " }}>
                  {(page - 1) * limit + index + 1}
                </TableCell>
                {activeTab === 1 && (
                  <>
                    <TableCell sx={{ paddingY: "4px " }}>
                      {row.updated_date}
                    </TableCell>
                    <TableCell sx={{ paddingY: "4px " }}>
                      {row.transaction_id}
                    </TableCell>
                  </>
                )}
                <TableCell sx={{ paddingY: "4px " }}>
                  {row.invoice_id}
                </TableCell>
                <TableCell sx={{ paddingY: "4px " }}>
                  {row.society_name}
                </TableCell>
                <TableCell sx={{ paddingY: "4px " }}>{row.name}</TableCell>
                <TableCell sx={{ paddingY: "4px " }}>
                  {row.mobile_number}
                </TableCell>
                <TableCell sx={{ paddingY: "4px " }}>
                  ₹ {formatNumberWithCommas(row?.withdraw_amount || 0)}
                </TableCell>
                <TableCell sx={{ paddingY: "4px " }}>
                  <img
                    src="/view.svg"
                    onClick={() => handleShow(row.id)}
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PendingPaymentModal
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        show={show}
        setShow={setShow}
        selectedPayment={selectedPayment}
      />
    </>
  );
}
