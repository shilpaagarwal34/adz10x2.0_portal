
import Skeleton from "react-loading-skeleton";

export default function AddFundCardSkeleton() {
  return (
    <div className="add-fund-card mt-3">
      <h5 className="mb-0 fw-bold">
        <Skeleton width={100} height={24} />
      </h5>

      <div className="mt-3">
        <Skeleton width={120} height={16} />
      </div>

      <div className="d-flex gap-3 flex-wrap flex-sm-nowrap mt-2">
        <div className="input-group" style={{ maxWidth: "250px" }}>
          <Skeleton width={40} height={38} style={{ borderRadius: '0.25rem 0 0 0.25rem' }} />
          <Skeleton width={210} height={38} style={{ borderRadius: '0 0.25rem 0.25rem 0' }} />
        </div>
        <Skeleton width={120} height={38} borderRadius={8} />
      </div>

      <div className="mt-3">
        <Skeleton width={200} height={16} />
        <Skeleton width={300} height={16} className="mt-2" />
      </div>
    </div>
  );
}
