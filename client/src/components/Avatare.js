import React from "react";
import { Avatar } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadUser } from "../actions/authActions";
const Avatare = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <div>
      <Avatar
        style={{ backgroundColor: "#1c8ffd", textTransform: "uppercase" }}
        icon={`${user.first_name}}`}
      />
    </div>
  );
};

export default Avatare;
