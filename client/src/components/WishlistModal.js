import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewWishlist, getWishlist } from "../actions/wishlistActions";
import { LoadingOutlined } from "@ant-design/icons";
import { loadUser } from "../actions/authActions";
import Modal from "react-modal";
import { Spin } from "antd";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    background: "#f9f9f9",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 999,
    width: "100%",
  },
};

const WishlistModal = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState({
    name: "",
  });
  useEffect(() => {
    dispatch(loadUser());
    setWishlist({ name: "" });
    dispatch(getWishlist());
  }, [modalIsOpen, loadUser, getWishlist]);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewWishlist(wishlist));
    closeModal();
  };
  const handleChange = (e) => {
    setWishlist({ ...wishlist, [e.target.name]: e.target.value });
  };
  return isLoading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
  ) : user ? (
    <>
      <span onClick={openModal}>Add Wishlist</span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="login-page ">
          <div className="form">
            <h2>Add Wishlist</h2>
            <form
              className="add-edit-form"
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit}
            >
              {/* <label>Wishlist Name:</label> */}
              <input
                type="text"
                name="name"
                value={wishlist.name}
                onChange={handleChange}
                placeholder="Enter the wishlist name..."
                required
              />
              <div className="button-modal">
                <button type="submit" className="button-confirm">
                  Confirm
                </button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  ) : null;
};

export default WishlistModal;
