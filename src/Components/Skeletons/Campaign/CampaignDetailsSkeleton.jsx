
import Skeleton from "react-loading-skeleton";

const CampaignDetailsSkeleton = () => {
  return (
    <div className="rounded">
      <div className="pt-2 pb-3 my-3 bg-white rounded-3 shadow-sm me-2">
        <div className="d-flex flex-wrap justify-content-between align-items-center px-3 pt-2">
          <Skeleton width={150} height={24} />
          <Skeleton width={100} height={20} />
        </div>

        <hr className="m-0" style={{ color: "gray" }} />

        <div className="d-flex flex-wrap p-3">
          <div className="col-12 col-sm-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="mb-3">
                <Skeleton width={120} height={16} />
                <Skeleton width={`80%`} height={18} />
              </div>
            ))}
          </div>

          <div className="col-12 col-sm-4 d-flex justify-content-sm-end">
            <div className="mb-3">
              <Skeleton width={100} height={16} />
              <Skeleton width={80} height={18} />
            </div>
          </div>

          <div className="col-12">
            <Skeleton width={220} height={20} />
          </div>
        </div>

        <hr className="m-0" style={{ color: "gray" }} />

        <div className="d-flex p-3">
          <div className="col-8">
            <div className="mb-3">
              <Skeleton width={100} height={16} />
              <Skeleton width={180} height={18} />
            </div>
            <div>
              <Skeleton width={100} height={16} />
              <Skeleton width={180} height={18} />
            </div>
          </div>
        </div>

        <hr className="m-0" style={{ color: "gray" }} />

        <div className="d-flex p-3">
          <div className="col-12">
            <Skeleton width={150} height={16} />
            <Skeleton width={100} height={18} />
          </div>
        </div>

        <div className="d-flex pt-0 p-3">
          <div className="col-7">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} width={`60%`} height={14} className="mb-2" />
            ))}
          </div>
          <div className="col-5">
            <Skeleton width={100} height={16} />
            <Skeleton width={80} height={26} />
          </div>
        </div>

        <div className="mx-3">
          <Skeleton height={36} width={`100%`} borderRadius={25} />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailsSkeleton;
