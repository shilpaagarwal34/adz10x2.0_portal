import Skeleton from "react-loading-skeleton";

const CampaignCardSkeleton = ({ count = 3 }) => {
  return (
    <div className="mt-3">
      <div
        className="card border-0 p-3 mb-3 rounded"
        style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" }}
      >
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold mb-3">
            <Skeleton width={200} height={24} />
          </h5>
        </div>

        {[...Array(count)].map((_, i) => (
          <div key={i} className="card border-0 p-3 mb-3 rounded shadow">
            <div className="row">
              {/* Image/Video Skeleton */}
              <div className="col-md-2">
                <Skeleton height={100} style={{ borderRadius: "6px" }} />
              </div>

              {/* Text Content */}
              <div className="col-md-7 d-flex flex-column justify-content-between">
                <div>
                  <Skeleton width={100} height={18} className="mt-2" />
                  <Skeleton width={150} height={14} className="mt-1" />
                </div>

                <div className="d-flex align-items-center mt-3">
                  <Skeleton circle width={40} height={40} className="me-2" />
                  <div>
                    <Skeleton width={120} height={16} />
                    <Skeleton width={100} height={12} className="mt-1" />
                  </div>
                </div>
              </div>

              {/* Right Side Buttons */}
              <div className="col-md-3 text-end d-flex gap-2 flex-column justify-content-between">
                <Skeleton width={80} height={30} borderRadius={20} />
                <Skeleton width={60} height={25} borderRadius={10} />
                <Skeleton width={100} height={25} borderRadius={4} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignCardSkeleton;
