import {React,useEffect,useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'   
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { clearErrors, loginUser } from '../actions/authActions';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link} from 'react-router-dom';

// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
//   };
//   const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
//   };

  

///////
const Login = () => {
    const [info,setInfo] = useState({
        email:"",
        password:"",
    });
    const { isLoading, isAuth, errors } = useSelector(state => state.auth)
    const history = useHistory()

    useEffect(() => {
        if(isAuth){
            history.push("/products")
        }
    }, [isAuth])

    useEffect(() => {
        if(errors){
            setTimeout(() => {
                dispatch(clearErrors())
            }, 5000);
        }
    }, [errors])

    const dispatch = useDispatch()
    const handleChange= e => {
        setInfo({...info,[e.target.name]:e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(loginUser(info))
    }
    return (
        <div className="login-page">
            <form className="form" onSubmit={handleSubmit}>
            <h2 className="login-style">Login to your account</h2>
              <div>
              {/* <label> <span>*</span> Email address </label> */}
              <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
              
              </div>
              <div>
              {/* <label><span>*</span> Password  </label> */}
              <input type="password" name="password" placeholder="Password" onChange={handleChange} />
              
              </div>
            { errors && <div className="error">
                {
                    errors.map((error, i) => <p key={i}>{error.msg}</p>)
                }
              </div>}
              <button type="submit">{isLoading ? (
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 ,color:"#FFFFFF"}} spin />} />
              ) : "Login"}</button>

              <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
  
        </form>
        
        {/* <Form onSubmit={handleSubmit}
      
    >
      <Form.Item 
        label="Email"
        name="email" onChange={handleChange}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        label="Password"
        name="password" onChange={handleChange}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <button type="submit">{isLoading ? (
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
              ) : "Login"}</button>

      <Form.Item  onSubmit={handleSubmit}>
        <Button type="primary" htmlType="submit">
        {isLoading ? (
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
              ) : "Login"}
        </Button>
      </Form.Item>
    </Form> */}
        </div>
    )
}

export default Login
