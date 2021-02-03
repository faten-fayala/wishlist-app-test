import React, { useEffect, useState } from "react";
import { Menu, Button, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { getWishlist } from "../actions/wishlistActions";
import ProductModal from "../components/ProductModal";
import WishlistModal from "./WishlistModal";

const Drawer = ({ type, setContent }) => {
  const handleClick = (e) => {
    openModal();
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  const dispatch = useDispatch();
  const { getProductLoading, product } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wish);

  useEffect(() => {
    if (type === "products") {
      dispatch(getProducts());
    } else if (type === "wishlist") {
      dispatch(getWishlist());
    }
  }, []);

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 250 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      <Button
        type="ghost"
        className="add_btn"
        // onClick={() => type === "products" && setContent("add_new")}
        onClick={openModal}
      >
        {/* <span className="span-plus">+</span> */}
        {type === "products" ? <ProductModal /> : <WishlistModal />}
      </Button>
      {getProductLoading ? (
        <p>Loading...</p>
      ) : type === "products" ? (
        product &&
        product.map((el) => (
          <List.Item onClick={() => setContent(el)}>{el.name}</List.Item>
        ))
      ) : type === "wishlist" ? (
        wishlist &&
        wishlist.map((w) => (
          <List.Item onClick={() => setContent(w)}>{w.name}</List.Item>
        ))
      ) : null}
    </Menu>
  );
};

export default Drawer;
