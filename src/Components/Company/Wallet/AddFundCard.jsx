import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFunds } from "../../../store/Actions/Company/Wallet/WalletActions";
import { toast } from "react-toastify"; // Import toast
import axiosInstance from "../../../utils/axiosInstance";
const REACT_APP_RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

function AddFundCard({ onSuccess }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(""); // State for the amount
  const [error, setError] = useState(""); // State for form errors
  const [isAllowedToAddFund, setIsAllowedToAddFund] = useState(false);
  const [checkingAmount, setCheckingAmount] = useState(false);
  const debounceRef = useRef(null);

  // Get the loading and error state from Redux store
  const { submitLoading, error: apiError } = useSelector(
    (state) => state.company.wallet
  );

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const amt = parseFloat(amount);

    // Clear the previous debounce timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Only run for valid numbers
    if (!isNaN(amt) && amt > 0) {
      debounceRef.current = setTimeout(async () => {
        setCheckingAmount(true);

        try {
          const res = await axiosInstance.post("/wallet-validation", {
            amount: amt,
          });

          const { isAllowed } = res.data; // Expect { isAllowed: true/false }
          setIsAllowedToAddFund(true);
          setError("");
        } catch (error) {
          console.error("Amount check failed", error.response.data?.message);
          setError(error?.response?.data?.message);
          setIsAllowedToAddFund(false);
        } finally {
          setCheckingAmount(false);
        }
      }, 500); // 500ms debounce
    } else {
      setIsAllowedToAddFund(false);
    }

    // Cleanup function to cancel debounce on unmount
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [amount]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const baseAmount = parseFloat(amount);

    if (isNaN(baseAmount)) {
      toast.error("Please Enter Valid Amount.");
      return;
    }

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load Razorpay SDK. Check your connection.");
        return;
      }

      const gst = baseAmount * 0.18;
      const totalAmount = baseAmount + gst;
      const finalAmount = Math.round(totalAmount); // Razorpay wants paise

      // 1. Create Razorpay order
      const { data: orderData } = await axiosInstance.post("/create-order", {
        amount: finalAmount,
      });

      // console.log(orderData);
      const token = localStorage.getItem("auth_token");
      const options = {
        key: REACT_APP_RAZORPAY_KEY_ID, // Set this in your .env file
        amount: orderData.amount, // amount in paisa
        currency: orderData.currency,
        name: "Your Company Name",
        description: "Add funds to wallet",
        order_id: orderData.id,
        prefill: {
          name: user?.society_comany_name,
          email: user?.email,
          contact: user?.mobile_number,
        },
        handler: async function (response) {
          try {
            // 2. Verify payment on backend

            const verifyResponse = await axiosInstance.post(
              "/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: orderData.amount,
              },
              {
                headers: {
                  Authorization: token, // Replace or store token safely
                },
              }
            );

            // console.log(verifyResponse);
            const { amount, razorpay_payment_id, razorpay_order_id } =
              verifyResponse.data;

            // 3. Add funds in Redux store
            dispatch(
              addFunds({
                amount: amount,
                razorpay_payment_id: razorpay_payment_id,
                razorpay_order_id: razorpay_order_id,
              })
            )
              .unwrap()
              .then(() => {
                setAmount("");
                toast.success("Funds added successfully!");
                if (onSuccess) {
                  onSuccess(); // close modal if provided
                }
              })
              .catch((err) => {
                toast.error(`Add Funds Error: ${err.message}`);
              });
          } catch (error) {
            toast.error("Payment verification failed.");
          }
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error("Something went wrong during the process.");
    }
  };

  return (
    <div className="add-fund-card">
      <h5 className="mb-0 fw-bold">Add Fund</h5>
      <label className="custom-label fw-medium">Fund Amount</label>
      <form onSubmit={handleSubmit}>
        <div className="d-flex gap-3 flex-wrap flex-sm-nowrap">
          <div className="input-group" style={{ maxWidth: "250px" }}>
            <span
              className="input-group-text text-primary"
              style={{ borderRight: "none", backgroundColor: "#E1F4FF" }}
            >
              ₹
            </span>
            <input
              type="number"
              className="form-control"
              style={{ borderLeft: "none" }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {isAllowedToAddFund && (
            <button
              className="addFundBtn"
              type="submit"
              disabled={submitLoading || checkingAmount}
            >
              {submitLoading ? "Adding..." : "ADD FUND"}
            </button>
          )}
        </div>
        {checkingAmount && (
          <p className="text-success small">Checking eligibility...</p>
        )}

        {error && <p className="text-danger formik-error">{error}</p>}
        {/* {apiError && <p className="text-danger formik-error">{apiError}</p>} */}
      </form>
      <p className="note mb-0">18% GST will be extra</p>
      <p className="mb-0 warning">
        Please note that you must add a minimum of INR 10,000 funds to your
        wallet initially.
      </p>
    </div>
  );
}

export default AddFundCard;
