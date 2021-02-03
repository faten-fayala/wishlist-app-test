import React, { useState, useEffect }from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom'   
import {clearErrors, registerUser} from '../actions/authActions'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Link} from 'react-router-dom';

const Register = () => {
    const [info,setInfo] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        password: "",
    });
    const { isLoading, isAuth, errors } = useSelector(state => state.auth)
    const dispatch = useDispatch()
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

    const handleChange= e => {
        setInfo({...info,[e.target.name]:e.target.value})
    }
    const registerNow = e => {
        e.preventDefault();
        dispatch(registerUser(info));
    };
    return (
        <div className="login-page">
        <form className="form" onSubmit={registerNow}>
          <div>
              {/* <label>Firstname</label> */}
              <input type="text" name="first_name" placeholder="First name" onChange={handleChange}/>
              </div> 
              <div>
              {/* <label>Lastname</label> */}
              <input type="text" name="last_name" placeholder="Last name" onChange={handleChange}/>
              </div>
              <div>
              {/* <label>phone</label> */}
              <input type="text" name="phone" placeholder="Phone" onChange={handleChange}/>
              </div> 
              <div>
              {/* <label>email</label> */}
              <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
              </div>
              <div>
              {/* <label>password</label> */}
              <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
              </div>
              { errors && <div className="error">
                {
                    errors.map((error, i) => <p key={i}>{error.msg}</p>)
                }
              </div>}
              <button type="submit">{isLoading ? (
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 24,color:"#FFFFFF"}} spin />} />
              ) : "Register"}</button>
               <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
        </div>
    )
}

export default Register
