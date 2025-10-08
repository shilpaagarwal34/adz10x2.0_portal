import React, { useState, useEffect } from "react";

const CountdownTimer = ({ onTimeUp, timerReset }) => {
  const [timeLeft, setTimeLeft] = useState(59);

  useEffect(() => {
    if (timerReset) {
      setTimeLeft(59); // Reset timer when resend button is clicked
    }
  }, [timerReset]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp(); // Notify parent when time is up
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Clear the timer on component unmount or time change
  }, [timeLeft, onTimeUp]);

  return (
    // <p className="mt-4 mb-3 fw-bold text-muted" style={{ fontSize: "14px" }}>
    //   Remaining time {String(timeLeft).padStart(2, "0")} Sec.
    // </p>
    <>
      {timeLeft > 0 && (
        <p
          className="mt-4 mb-3 fw-bold text-muted"
          style={{ fontSize: "14px" }}
        >
          Remaining time {String(timeLeft).padStart(2, "0")} Sec.
        </p>
      )}
    </>
  );
};

export default CountdownTimer;
