
import { Row, Col, Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const LiveCardSkeleton = () => {
  return (
    <>
      <Row className="px-3 pt-3 pb-2">
        <Col>
          <Skeleton width={180} height={20} />
        </Col>
        <Col className="text-end">
          <Skeleton width={100} height={20} className="me-3" />
          <Skeleton width={100} height={24} />
        </Col>
      </Row>
      <hr className="m-0" style={{ color: "gray" }} />
      <Row className="p-3">
        {/* Left Column: Image/Video Placeholder */}
        <Col md={6} className="p-0">
          <Card className="px-2 py-1 border-0 position-relative">
            <Skeleton height={250} borderRadius={8} />
            <Skeleton
              width={100}
              height={30}
              style={{ position: "absolute", bottom: 10, right: 10 }}
            />
          </Card>
        </Col>

        {/* Right Column: Report Info */}
        <Col md={6} className="p-0">
          <Card className="py-1 px-3 border-0">
            <Skeleton width={200} height={20} />

            <div className="mt-4">
              <Skeleton width={120} height={16} />
              <Skeleton width={120} height={80} />
            </div>

            <Card className="border-0 mt-3">
              <Skeleton width={80} height={16} className="mb-2" />
              <Skeleton count={3} height={12} />
            </Card>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LiveCardSkeleton;
