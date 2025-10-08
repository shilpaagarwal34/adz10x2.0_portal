import React from "react";
import { formatNumberWithCommas } from "../../../helper/helper.js";

export default function WalletBalanceCard({ walletAmount }) {
  return (
    <div className="d-flex align-items-center justify-content-between wallet-card ">
      <div>
        <h5 className="fw-bold">My Wallet</h5>
        <p>Your current balance</p>
        <p className="fw-bolder fs-2 text-white">
          ₹ {formatNumberWithCommas(walletAmount || 0)}
        </p>
        <svg
          width="172"
          className="vector1"
          height="88"
          viewBox="0 0 172 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="58" cy="114" r="114" fill="white" fillOpacity="0.19" />
        </svg>

        <svg
          width="184"
          height="155"
          className="vector2"
          viewBox="0 0 184 155"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="114" cy="41" r="114" fill="white" fillOpacity="0.13" />
        </svg>

        <svg
          width="157"
          height="72"
          className="vector3"
          viewBox="0 0 157 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="78.5"
            cy="-6.5"
            r="78.5"
            fill="white"
            fillOpacity="0.13"
          />
        </svg>
      </div>

      <div className="">
        <svg
          width="191"
          height="131"
          viewBox="0 0 191 191"
          fill="none"
          className="wallet-img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_0_4517)">
            <path
              d="M118.796 104.174C119.765 106.355 121.561 108.062 123.789 108.918C126.017 109.775 128.494 109.712 130.675 108.743C132.857 107.773 134.563 105.977 135.42 103.749C136.277 101.521 136.214 99.0444 135.244 96.8632C134.275 94.6819 132.479 92.9752 130.251 92.1183C128.023 91.2614 125.546 91.3246 123.365 92.294C121.184 93.2634 119.477 95.0596 118.62 97.2875C117.763 99.5153 117.826 101.992 118.796 104.174Z"
              stroke="#FAB600"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M101.28 64.7047C70.6006 75.8646 44.1171 82.3427 31.0703 84.0703L53.1501 133.751C58.0115 144.689 60.441 150.156 65.8215 153.102C71.202 156.049 76.4229 155.239 86.8647 153.618C103.729 150.995 120.64 146.381 135.433 141.461C150.777 136.363 158.443 133.815 161.648 126.489C164.855 119.167 161.333 111.244 154.296 95.4098L149.388 84.3672C142.553 68.9877 139.137 61.3007 132.592 58.4971C126.047 55.6935 117.794 58.692 101.28 64.7047Z"
              stroke="url(#paint0_linear_0_4517)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M116.138 59.3951C114.737 50.6743 110.309 35.6433 101.59 31.0809C96.068 28.184 90.9969 30.9565 86.0428 33.6967C59.9954 48.1292 42.9954 61.4823 33.7549 69.5287C29.778 72.9902 28.7441 78.8337 30.9738 83.8505"
              stroke="#FAB600"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_0_4517"
              x1="80.4163"
              y1="62.1392"
              x2="70.5371"
              y2="163.037"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.514854" stopColor="#FAB600" />
              <stop offset="1" stopColor="#CF9700" />
            </linearGradient>
            <clipPath id="clip0_0_4517">
              <rect
                width="144"
                height="144"
                fill="white"
                transform="translate(0 58.4824) rotate(-23.9621)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
