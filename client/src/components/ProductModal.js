import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../actions/productActions";
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

const ProductModal = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });
  useEffect(() => {
    dispatch(loadUser());
    setProduct({ name: "", image: "", price: "", description: "" });
  }, [modalIsOpen, loadUser]);

  const addProduct = () => {
    let formData = new FormData();
    Object.keys(product).map((el) => formData.append(el, product[el]));

    dispatch(addNewProduct(formData));
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
    closeModal();
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  return isLoading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
  ) : user ? (
    <>
      <span onClick={openModal}>Add Product</span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="login-page ">
          <div className="form">
            <h2>Add Product</h2>
            <form
              className="add-edit-form"
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit}
            >
              {/* <label>Product Picture</label> */}
              <input
                type="file"
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.files[0] })
                }
                placeholder="Enter the product picture..."
                required
              />
              {/* <label>Product Name</label> */}
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter the product name..."
                required
              />
              {/* <label>Product Price</label> */}
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter the product price..."
                required
              />
              <input type="text" value={product.wishlist} onChange={handleChange} name="wishlist" placeholder="Enter the product wishlist..." />
              <input type="text" value={product.status} onChange={handleChange} name="status" placeholder="Enter the product status..." />
              <textarea
                type="textarea"
                rows="4"
                placeholder="Enter the product description..."
                onChange={handleChange}
                value={product.description}
                name="description"
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

export default ProductModal;
