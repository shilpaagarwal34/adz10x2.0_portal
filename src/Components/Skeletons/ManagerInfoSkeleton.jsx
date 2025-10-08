import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ManagerInfoSkeleton() {
  return (
    <div className="py-2 mt-3 bg-white px-3 rounded-3 shadow-sm d-flex justify-content-between">
      <div className="flex-grow-1">
        <Skeleton width={140} height={20} />
        <Skeleton width={100} height={15} />
      </div>
      <div className="d-flex align-items-center">
        <Skeleton circle width={30} height={30} className="me-2" />
        <Skeleton circle width={30} height={30} />
      </div>
    </div>
  );
}

export default ManagerInfoSkeleton;
