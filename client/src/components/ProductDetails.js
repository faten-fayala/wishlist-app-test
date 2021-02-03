import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeProducts, getProducts } from "../actions/productActions";
import { Avatar, Card, Meta } from "antd";

const ProductDetails = ({ content, type }) => {
  const dispatch = useDispatch();
  const deleteProduct = (id) => dispatch(removeProducts(id));
  const { Meta } = Card;
  return (
    <div style={{ marginLeft:50,textTransform: "capitalize"}}>
      {content.name && (
        <Card
          hoverable
          style={{ width: 350}}
          cover={
            <img
              style={{
                width: "350px",
                height: "350px",
                overflow: "hidden",
              }}
              alt={content.image}
              src={
                content.image
                  ? process.env.REACT_APP_IMAGE_STORAGE + content.image
                  : ""
              }
            />
          }
        >
          <Meta title={content.name} /> <br/>
          <p className="description">
            {/* <span className="product-description-title">Description :</span>
              <br /> */}
            {content.description}
          </p>
          <p>
            <span className="product-description-title">Price : </span>
            {content.price}
          </p>
          <p>
            <span className="product-description-title">Status : </span>
            {content.status}
          </p>
          <p>
            <span className="product-description-title">wishlist : </span>
            {content.wishlist}
          </p>

          <button
            onClick={() => deleteProduct(content._id)}
            className="delete-button"
          >
            Delete
          </button>
        </Card>
      )}
    </div>
  );
};

export default ProductDetails;
