import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { loadUser } from "../actions/authActions";
import { getWishlist } from "../actions/wishlistActions";
import { Avatar, Spin } from "antd";
import Avatare from "../components/Avatare";

const Wishlists = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wish);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getWishlist());
  }, []);

  return isLoading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
  ) : user ? (
    <div>
      {/* <div className="avatar-container">
        <Avatar
          size={55}
          className="avatar-style"
          icon={user.first_name.slice(0, 1) + user.last_name.slice(0, 1)}
        />
      </div> */}
      <div className="wishlist-cards">
        {wishlist.map((el) => (
          <div key={el.name} className="wish-name">
            {el.name}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default Wishlists;


