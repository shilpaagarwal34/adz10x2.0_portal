// utils/showConfirmToast.js
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

export const ConfirmDeleteToast = ({ message, onConfirm }) => {
  const toastId = toast.loading("...");

  const ConfirmToast = () => {
    const toastRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (toastRef.current && !toastRef.current.contains(event.target)) {
          toast.dismiss(toastId);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div ref={toastRef} style={{ padding: "10px" }}>
        <p>{message}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "8px",
          }}
        >
          <button
            onClick={() => {
              onConfirm?.();
              toast.dismiss(toastId);
            }}
            style={{
              backgroundColor: "#d9534f",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            style={{
              padding: "5px 10px",
              cursor: "pointer",
              border: "none",
            }}
          >
            No
          </button>
        </div>
      </div>
    );
  };

  toast.update(toastId, {
    render: <ConfirmToast />,
    isLoading: false,
    autoClose: false,
    closeOnClick: false,
    closeButton: true,
    draggable: false,
    icon: false,
    style: {
      width: "400px",
    },
  });
};
