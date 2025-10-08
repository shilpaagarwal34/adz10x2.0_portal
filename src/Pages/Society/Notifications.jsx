import { useEffect, useState } from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";

import api_routes from "../../config/api.js";
import axiosInstance from "../../utils/axiosInstance.js";
import {
  setNotifications,
  clearNotifications as clearReduxNotifications,
  markAsRead as markAsReadRedux,
} from "../../store/Slice/Common/NotificationsSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Notifications = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [markingRead, setMarkingRead] = useState({}); // { id: true }

  const notifications = useSelector((state) => state.notifications.items);

  const getUserType = () => {
    const user = JSON.parse(localStorage.getItem("user_data"));
    const userType = user.user_type;

    if (userType === "Company_Admin" || userType === "Company_User")
      return "company";
    else if (userType === "Society_Admin" || userType === "Society_User")
      return "society";
    else return "admin";
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);

    try {
      const userType = getUserType();

      let endpoint = api_routes[userType]?.fetch_notification;

      const response = await axiosInstance.get(endpoint);

      dispatch(setNotifications(response.data?.data));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearAllNotifications = async () => {
    setClearing(true);
    try {
      const userType = getUserType();

      let endpoint = api_routes[userType]?.clear_notification;

      const ids = notifications.map((n) => n.id);

      await axiosInstance.post(endpoint, { ids }); // Use DELETE with body if your backend supports it

      dispatch(clearReduxNotifications());
    } catch (error) {
      console.error("Error clearing notifications:", error);
    } finally {
      setClearing(false);
    }
  };

  const markAsRead = async (id) => {
    setMarkingRead((prev) => ({ ...prev, [id]: true }));
    try {
      const userType = getUserType();

      let endpoint = api_routes[userType]?.clear_notification;

      await axiosInstance.post(endpoint, { ids: [id] });
      dispatch(markAsReadRedux(id));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    } finally {
      setMarkingRead((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="pt-1">
      <Card className="m-4 p-4 rounded border-0">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold">All Notifications</h5>
          <Button
            variant="light"
            onClick={clearAllNotifications}
            disabled={clearing}
          >
            {clearing ? (
              <Spinner size="sm" animation="border" />
            ) : (
              "Clear All Notifications"
            )}
          </Button>
        </div>
        <hr />

        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-4 text-muted">No notifications.</div>
        ) : (
          notifications.map((notification, index) => (
            <Card
              key={notification.id || index}
              className="border-0 custom-label"
            >
              <Row className="d-flex align-items-center justify-content-between">
                <Col xs={9} className="d-flex align-items-center">
                  <div>
                    <p className="mb-1 text-muted">{notification.message}</p>
                  </div>
                </Col>
                <Col
                  xs={3}
                  className="d-flex flex-column align-items-end text-end justify-content-between"
                >
                  <span className="text-muted">{notification.time}</span>
                  <div className="d-flex gap-2 mt-1">
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => markAsRead(notification.id)}
                        disabled={markingRead[notification.id]}
                      >
                        {markingRead[notification.id]
                          ? "Marking..."
                          : "Mark as Read"}
                      </Button>
                    )}
                    {/* Trash Icon */}
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Trash icon paths */}
                    </svg>
                  </div>
                </Col>
              </Row>
              <hr />
            </Card>
          ))
        )}
      </Card>
    </div>
  );
};

export default Notifications;
