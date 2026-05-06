import { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header.png";
import photoModel from "/src/assets/images/delete-model.svg";
import { Modal, Button } from "react-bootstrap";
import { deleteUser, getUsers } from "../../../../api/modules/user";
import NoData from "../../../Shared/components/NoData/NoData";

export default function UsersList() {
  const [userLists, setUserLists] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedUserId(id);
    setShow(true);
  };

  const getList = async () => {
    try {
      let response = await getUsers();
      setUserLists(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserById = async (id) => {
    try {
      await deleteUser(id);
      setUserLists((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Header
        title={"Users List"}
        description={"You can check all details"}
        imgUrl={photo}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body className="text-center">
          <img src={photoModel} alt="model" className="m-3 img-fluid" />
          <h5 className="my-2">Delete This User?</h5>
          <p className="text-muted">
            Are you sure you want to delete this user? If yes click delete.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={async () => {
              await deleteUserById(selectedUserId);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="px-5 py-3">
        <h4>Users Table Details</h4>
        <span>You can check all details</span>
      </div>

      <div className="px-5 py-3">
        {userLists.length > 0 ? (
          <table className="table table-striped table-responsive text-center">
            <thead className="table-light fs-5">
              <tr style={{ height: "50px" }}>
                <th className="py-4 px-3" scope="col">
                  #
                </th>
                <th className="py-4 px-3" scope="col">
                  User Name
                </th>
                <th className="py-4 px-3" scope="col">
                  Email
                </th>
                <th className="py-4 px-3" scope="col">
                  Creation date
                </th>
                <th className="py-4 px-3" scope="col">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {userLists.map((user) => (
                <tr key={user.id} style={{ height: "65px" }}>
                  <th scope="row" className="py-3 px-3">
                    {user.id}
                  </th>

                  <td className="py-3 px-3">{user.userName}</td>

                  <td className="py-3 px-3">{user.email}</td>

                  <td className="py-3 px-3">
                    {new Date(user.creationDate).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-3">
                    <i
                      onClick={() => handleShow(user.id)}
                      className="fa fa-trash text-danger"
                      style={{ cursor: "pointer", fontSize: "18px" }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
