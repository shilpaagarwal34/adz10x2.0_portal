import React from "react";
import { Table, Row, Col, Form, Pagination } from "react-bootstrap";
import { Eye } from "react-feather";
import { useNavigate } from "react-router-dom";
import "../../../../Pages/Styles/Society-Dashboard.css"

const DraftTable = ({ activeTab, data }) => {
  const navigate = useNavigate();

  return (
    <div className="card border-0 p-3 mx-4 my-3">
      {/* Search & Filter Section */}
      <Row className="d-flex justify-content-between">
        <Col md={4} className="d-flex align-items-center custom-label fw-medium">
          <span className="me-2">Show</span>
          <Form.Select className="w-auto form-select-sm custom-label">
            <option>10</option>
            <option>25</option>
          </Form.Select>
          <span className="ms-2">Entries</span>
        </Col>

        <Col md={3} className="text-end d-flex align-items-center gap-2">
          <h6 className="custom-label m-0">Search:</h6>
          <Form.Control type="text" className="form-control-sm" />
        </Col>
      </Row>

      {/* Table Section */}
      <Table bordered className="custom-label">
        <thead>
          <tr className="striped-thead">
            <th >Sr No.</th>
            <th>Campaign ID</th>
            <th>Created Date</th>
            <th>Campaign Heading</th>
            <th>Campaign Type</th>
            <th>Creative Type</th>
            <th style={{width: "11%"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((ad, index) => (
            <tr key={ad.id}>
              <td>{index + 1}</td>
              <td>{ad.campaignId}</td>
              <td>{ad.date}</td>
              <td>Mplussoft Technologies</td>
              <td>Brand Promotions</td>
              <td>{ad.type}</td>
              <td className="text-center ">
                <svg
                  className="me-2"
                  width="23"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  style={{ cursor: "pointer" }}
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => navigate("/company/campaign/newcampaign")}
                >
                  <rect
                    width="28"
                    height="28"
                    rx="6"
                    fill="#FAB600"
                    fill-opacity="0.22"
                  />
                  <path
                    d="M14 12C13.4696 12 12.9609 12.2107 12.5858 12.5858C12.2107 12.9609 12 13.4696 12 14C12 14.5304 12.2107 15.0391 12.5858 15.4142C12.9609 15.7893 13.4696 16 14 16C14.5304 16 15.0391 15.7893 15.4142 15.4142C15.7893 15.0391 16 14.5304 16 14C16 13.4696 15.7893 12.9609 15.4142 12.5858C15.0391 12.2107 14.5304 12 14 12Z"
                    fill="#FAB600"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14 9C11.7954 9 9.81305 9.80846 8.38484 10.81C7.66905 11.3115 7.08211 11.8685 6.67032 12.41C6.26611 12.9423 6 13.5008 6 14C6 14.4992 6.26695 15.0577 6.67032 15.5892C7.08295 16.1315 7.66905 16.6885 8.38484 17.1892C9.81305 18.1923 11.7954 19 14 19C16.2046 19 18.1869 18.1915 19.6152 17.19C20.3309 16.6885 20.9179 16.1315 21.3288 15.59C21.7331 15.0577 22 14.4992 22 14C22 13.5008 21.7331 12.9423 21.3288 12.4108C20.9179 11.8685 20.3309 11.3115 19.6152 10.8108C18.1869 9.80769 16.2046 9 14 9ZM10.8421 14C10.8421 13.235 11.1748 12.5012 11.767 11.9603C12.3593 11.4193 13.1625 11.1154 14 11.1154C14.8375 11.1154 15.6407 11.4193 16.233 11.9603C16.8252 12.5012 17.1579 13.235 17.1579 14C17.1579 14.765 16.8252 15.4988 16.233 16.0397C15.6407 16.5807 14.8375 16.8846 14 16.8846C13.1625 16.8846 12.3593 16.5807 11.767 16.0397C11.1748 15.4988 10.8421 14.765 10.8421 14Z"
                    fill="#FAB600"
                  />
                </svg>

                <svg
                  width="23"
                  height="28"
                  className="me-2"
                  viewBox="0 0 28 28"
                  fill="none"
                  style={{ cursor: "pointer" }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="23" height="23" rx="6" fill="#c9f6de" />
                  <path
                    d="M14.75 9.71131L18.285 13.2471L10.035 21.4971H6.5V17.9613L14.75 9.71131ZM15.9283 8.53297L17.6958 6.76547C17.8521 6.60925 18.064 6.52148 18.285 6.52148C18.506 6.52148 18.7179 6.60925 18.8742 6.76547L21.2317 9.12214C21.3879 9.27841 21.4757 9.49034 21.4757 9.71131C21.4757 9.93228 21.3879 10.1442 21.2317 10.3005L19.4633 12.0688L15.9283 8.53297Z"
                    fill="#009945"
                  />
                </svg>

                <svg
                  width="23"
                  height="28"
                  className="me-2"
                  viewBox="0 0 28 28"
                  fill="none"
                  style={{ cursor: "pointer" }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="28"
                    height="28"
                    rx="6"
                    fill="#FF5B5B"
                    fill-opacity="0.22"
                  />
                  <path
                    d="M12.1122 8.33246H15.89C15.89 7.8315 15.691 7.35105 15.3367 6.99682C14.9825 6.64258 14.502 6.44358 14.0011 6.44358C13.5001 6.44358 13.0197 6.64258 12.6654 6.99682C12.3112 7.35105 12.1122 7.8315 12.1122 8.33246ZM10.2233 8.33246C10.2233 7.33054 10.6213 6.36964 11.3298 5.66117C12.0383 4.9527 12.9992 4.55469 14.0011 4.55469C15.003 4.55469 15.9639 4.9527 16.6724 5.66117C17.3808 6.36964 17.7789 7.33054 17.7789 8.33246H22.5011C22.7516 8.33246 22.9918 8.43197 23.1689 8.60909C23.346 8.7862 23.4455 9.02643 23.4455 9.27691C23.4455 9.52739 23.346 9.76761 23.1689 9.94473C22.9918 10.1219 22.7516 10.2214 22.5011 10.2214H21.6681L20.8313 19.9869C20.7509 20.9299 20.3194 21.8084 19.6223 22.4485C18.9252 23.0886 18.0132 23.4437 17.0668 23.4436H10.9354C9.989 23.4437 9.07701 23.0886 8.37989 22.4485C7.68277 21.8084 7.25131 20.9299 7.17086 19.9869L6.33408 10.2214H5.50108C5.2506 10.2214 5.01038 10.1219 4.83326 9.94473C4.65614 9.76761 4.55664 9.52739 4.55664 9.27691C4.55664 9.02643 4.65614 8.7862 4.83326 8.60909C5.01038 8.43197 5.2506 8.33246 5.50108 8.33246H10.2233ZM16.8344 13.9991C16.8344 13.7486 16.7349 13.5084 16.5578 13.3313C16.3807 13.1542 16.1405 13.0547 15.89 13.0547C15.6395 13.0547 15.3993 13.1542 15.2221 13.3313C15.045 13.5084 14.9455 13.7486 14.9455 13.9991V17.7769C14.9455 18.0274 15.045 18.2676 15.2221 18.4447C15.3993 18.6219 15.6395 18.7214 15.89 18.7214C16.1405 18.7214 16.3807 18.6219 16.5578 18.4447C16.7349 18.2676 16.8344 18.0274 16.8344 17.7769V13.9991ZM12.1122 13.0547C11.8617 13.0547 11.6215 13.1542 11.4444 13.3313C11.2673 13.5084 11.1678 13.7486 11.1678 13.9991V17.7769C11.1678 18.0274 11.2673 18.2676 11.4444 18.4447C11.6215 18.6219 11.8617 18.7214 12.1122 18.7214C12.3627 18.7214 12.6029 18.6219 12.78 18.4447C12.9571 18.2676 13.0566 18.0274 13.0566 17.7769V13.9991C13.0566 13.7486 12.9571 13.5084 12.78 13.3313C12.6029 13.1542 12.3627 13.0547 12.1122 13.0547Z"
                    fill="#EC0000"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Row className="align-items-center">
        {/* Left Side: Showing Entries */}
        <Col md={6}>
          <span className="fw-medium custom-label">Showing 1 to 10 of 10 Entries</span>
        </Col>

        {/* Right Side: Pagination */}
        <Col md={6} className="d-flex justify-content-end">
        <div className="pagination-container">
            <button className="pagination-btn">Previous</button>
            <span className="pagination-number">1</span>
            <button className="pagination-btn">Next</button>
        </div>
        </Col>
      </Row>
    </div>
  );
};

export default DraftTable;