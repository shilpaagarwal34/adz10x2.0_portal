import { Table, Button } from "react-bootstrap";
import { downloadFile, downloadInvoice } from "../../../helper/helper.js";

const PaymentTable = ({ payments }) => {
  return (
    <div className="table-responsive">
      <Table bordered className="custom-label" style={{ minWidth: "1000px" }}>
        <thead>
          <tr className="striped-thead">
            <th>Sr No.</th>
            <th>Date & Time</th>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>GST Amount</th>
            <th>Total Amount</th>
            <th>Descriptions</th>
            <th style={{ width: "16%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment, index) => (
            <tr key={payment.id}>
              <td>{index + 1}</td>
              <td>{payment.date}</td>
              <td>{payment.transaction_id}</td>
              <td>₹ {payment.amount}</td>
              <td>₹ {payment.gst_amount}</td>
              <td>
                ₹ {parseFloat(payment.amount) + parseFloat(payment.gst_amount)}
              </td>
              <td>{payment.description || "N/A"}</td>
              <td className="text-center">
                <Button
                  className="invoice-btn"
                  onClick={() => downloadInvoice(payment?.invoice_url_path)}
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
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PaymentTable;
