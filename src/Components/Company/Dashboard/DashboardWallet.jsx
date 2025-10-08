import React, { useEffect, useState } from "react";
import WalletModal from "./WalletModal";
import { Button } from "react-bootstrap";
import { fetchWalletAmount } from "../../../store/Actions/Company/Wallet/WalletActions";
import { formatNumberWithCommas } from "../../../helper/helper";

export default function DashboardWallet() {
  const [show, setShow] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchWalletAmount();
      setWalletAmount(result.wallet_amount); // Assuming result contains the amount you want
    };

    fetchData();
  }, []);

  return (
    <div className="py-2 mt-3 bg-white px-2 rounded-3 shadow-sm d-flex justify-content-between">
      <div>
        <p className="fw-bold fs-5">My Wallet</p>
        <p className="m-0 fw-medium custom-label">Your Current Balance</p>
        <p className="m-0 fw-bold fs-3">
          ₹ {formatNumberWithCommas(walletAmount || 0)}
        </p>
      </div>
      <div className="d-flex flex-column align-items-end justify-content-between">
        <img src="/wallet.svg" style={{ width: "40px" }} alt="Wallet" />
        <Button
          onClick={handleShow}
          style={{
            backgroundColor: "#007665",
            border: "none",
            borderRadius: "20px",
            fontSize: "12px",
            padding: "5px 15px",
          }}
        >
          ADD FUND
        </Button>
      </div>

      <WalletModal show={show} handleClose={handleClose} />
    </div>
  );
}
