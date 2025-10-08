import Skeleton from "react-loading-skeleton";

export default function DashboardCountSkeleton() {
  const cardSkeleton = (
    <div className="py-2 px-3 bg-white rounded shadow-sm">
      <p className="text-muted mb-1 fw-bold fs-6">
        <Skeleton width={80} height={15} />
        <br />
        <Skeleton width={60} height={12} />
      </p>
      <h2 className="fw-bold mt-2">
        <Skeleton width={30} height={24} />
      </h2>
    </div>
  );

  return (
    <div className="row">
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="col-md-3 mb-2 mb-md-0 pe-0">
          {cardSkeleton}
        </div>
      ))}
    </div>
  );
}
