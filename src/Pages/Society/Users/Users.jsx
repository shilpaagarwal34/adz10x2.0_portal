import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import UsersTable from "../../../Components/Common/Users/UsersTable.jsx";
import HeaderButton from "../../../Components/Common/Users/HeaderButton.jsx";
import UserModal from "../../../Components/Common/Users/UserModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchSocietyUsers } from "../../../store/Actions/Society/Users/UserActions.js";

const Users = () => {
  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState(null); // State to track the user being edited
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { users, loading, error, total, tableName } = useSelector(
    (state) => state.society.users
  );

  useEffect(() => {
    dispatch(fetchSocietyUsers({ page: currentPage, limit, search }));
  }, [dispatch, currentPage, limit, search]);

  const handleEditUser = (user) => {
    setEditUser(user); // Set the user to be edited
    setShow(true); // Show the modal
  };

  const handleAddUser = () => {
    setEditUser(null); // Reset user data for "Add" mode
    setShow(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShow(false);
    setEditUser(null);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to page 1 when search changes
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < Math.ceil(total / limit)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    if (direction === "previous" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div style={{ height: "100vh" }} className="pt-4">
      <Row className="card m-2 mx-sm-4 border-0 d-flex p-4">
        <Col className="d-flex justify-content-end">
          <HeaderButton onClick={handleAddUser} />
        </Col>
      </Row>

      <UserModal show={show} onClose={handleCloseModal} user={editUser} />

      <UsersTable
        users={users}
        onEdit={handleEditUser}
        isLoading={loading}
        error={error}
        limit={limit}
        setLimit={setLimit}
        handlePageChange={handlePageChange}
        total={total}
        currentPage={currentPage}
        handleSearchChange={handleSearchChange}
        tableName={tableName}
      />
    </div>
  );
};

export default Users;
