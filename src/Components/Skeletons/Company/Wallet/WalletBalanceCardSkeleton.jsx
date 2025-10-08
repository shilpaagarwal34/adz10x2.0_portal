import Skeleton from "react-loading-skeleton";

export default function WalletBalanceCardSkeleton() {
  return (
    <div className="d-flex align-items-center justify-content-between mt-4 add-fund-card">
      <div>
        <h5 className="fw-bold">
          <Skeleton width={100} />
        </h5>
        <p>
          <Skeleton width={120} />
        </p>
        <p className="fw-bolder fs-2 text-white">
          <Skeleton width={150} height={40} />
        </p>
      </div>
    </div>
  );
}
