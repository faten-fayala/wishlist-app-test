import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { loadUser } from "../actions/authActions";
import { getProducts } from "../actions/productActions";
import { Avatar, Card , Spin} from "antd";

const Products = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const { product } = useSelector((state) => state.products);
  const { Meta } = Card;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getProducts());
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
      <div className="product-cards">
        {product.map((el) => (
          <div>
            <Card
              hoverable
              style={{ width: 200 }}
              cover={
                <img
                style={{width: "200px", height: "200px", overflow: "hidden",
             
              }}
                  alt={el.image}
                  src={
                    el.image
                      ? process.env.REACT_APP_IMAGE_STORAGE + el.image
                      : ""
                  }
                />
              }
            >
              <Meta title={el.name} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default Products;
