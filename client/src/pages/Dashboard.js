import React, { useEffect } from "react";
import { Tabs, Button, Dropdown, Menu, message, Avatar } from "antd";
import Products from "./Products";
import Wishlists from "./Wishlists";
import WishlistModal from "../components/WishlistModal";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "../components/Drawer";
import { DownOutlined } from "@ant-design/icons";
import ProductDetails from "../components/ProductDetails";
import { loadUser } from "../actions/authActions";
const { TabPane } = Tabs;

// const currencyMenu = (
//   <Menu onClick={handleMenuClick}>
//     <Menu.Item key="1">EURO</Menu.Item>
//     <Menu.Item key="2">DOLLAR</Menu.Item>
//     <Menu.Item key="3">TND</Menu.Item>
//   </Menu>
// );

// const operations = (
//   <div>
//     <Dropdown overlay={currencyMenu}>
//       <Button>
//         Currency <DownOutlined />
//       </Button>
//     </Dropdown>
//     <div>
//       <h1>hello</h1>
//     </div>
//   </div>
// );

function handleMenuClick(e) {
  message.info("Click on menu item.");
  console.log("click", e);
}

const Dashboard = () => {
  const [type, setType] = React.useState("wishlist");
  const [content, setContent] = React.useState("add_new");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  // const operations = (
  //   <div className="avatar-container">
  //     {/* <Avatar
  //       size={55}
  //       className="avatar-style"
  //       icon={user.first_name.slice(0, 1) + user.last_name.slice(0, 1)}
  //     /> */}
  //     <Avatar
  //       size={55}
  //       style={{ backgroundColor: "#1c8ffd", textTransform: "uppercase" }}
  //       icon={`${user.first_name}}`}
  //     />
  //   </div>
  // );
  const changeContent = (key) => {
    if (key === "1") {
      setType("wishlist");
    } else {
      setType("products");
    }
  };

  return user ? (
    // tabBarExtraContent={operations}
    <div className="tab-style">
      <Avatar
      className="avatar-display"
        size={50}
        style={{ backgroundColor: "#1c8ffd", textTransform: "uppercase" }}
        icon={`${user.first_name.slice(0, 1)} ${user.last_name.slice(0, 1)}`}
      />
      <Tabs onTabClick={changeContent}>
        <TabPane tab={<i className="fas fa-heart"> My Wishlists</i>} key="1">
          <div className="row">
            <Drawer type={type} setContent={setContent} />
            <div className="col-lg-8 col-md-7 col-sm-6 col-xs-12">
              <h1 style={{color: '#0b5ab6',textAlign:'center',
    paddingBottom: '20px'}}><strong>WISHLIST PAGE</strong></h1>
              {/* <i className="fas fa-th-large"> Grid</i>
              <i className="far fa-list"> List</i> */}
              <Wishlists content={content} type={type} />
            </div>
          </div>
        </TabPane>
        <TabPane
          tab={<i className="fas fa-clipboard-list"> My Products</i>}
          key="2"
        >
          <div className="row">
            <Drawer type={type} setContent={setContent} />
            <div className="col-lg-8 col-md-7 col-sm-6 col-xs-12">
              <h1 style={{color: '#0b5ab6',textAlign:'center',
    paddingBottom: '20px'}}>PRODUCT PAGE</h1>
              {/* <i className="fas fa-th-large"> Grid</i>
              <i className="far fa-list"> List</i> */}
              {content === "add_new" ? (
                <Products />
              ) : (
                <ProductDetails content={content} type={type} />
              )}
            </div>
          </div>
        </TabPane>
        <div className="scroll_to_top">
          <a href="#top">
            <svg
              className="img-scroll-top"
              version="1.1"
              id="IconsRepoEditor"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 346.078 346.078"
              stroke="#000000"
              stroke-width="0"
            >
              <g id="IconsRepo_bgCarrier"></g>{" "}
              <path d="M0,173.111C0,77.695,77.629,0.072,173.039,0.072c95.416,0,173.039,77.623,173.039,173.039 c0,93.405-74.407,169.722-167.06,172.89l0.376-193.565l33.588,33.588l8.437-8.437l-47.962-47.962l-48.797,48.797l8.437,8.437 l34.369-34.363l-0.382,193.512C74.425,342.844,0,266.528,0,173.111z"></path>{" "}
            </svg>
          </a>
        </div>
      </Tabs>
      <br />
      <br />
      <br />
    </div>
  ) : null;
};

export default Dashboard;
