
import Skeleton from "react-loading-skeleton";

export default function DateFilterSkeleton() {
  return (
    <div className="card border-0 p-3 mx-2 mx-sm-4 my-3">
      <div className="d-flex align-items-end flex-wrap gap-3">
        <div className="d-flex gap-3 flex-wrap">
          <div className="d-flex flex-column">
            <Skeleton width={70} height={14} className="mb-1" />
            <Skeleton width={160} height={38} />
          </div>

          <div className="d-flex flex-column">
            <Skeleton width={70} height={14} className="mb-1" />
            <Skeleton width={160} height={38} />
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <Skeleton width={110} height={38} borderRadius={6} />
          <Skeleton width={110} height={38} borderRadius={6} />
        </div>
      </div>
    </div>
  );
}
