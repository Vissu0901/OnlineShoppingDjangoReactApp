import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import Base from '../core/Base'
import { authenticate, isAuthenticated, signin } from '../auth/helper'

const Signin = () => {

    const [values, setValues] = useState({
        email: 'usertest1@mail.com',
        password:'12345',
        error:'',
        success:false,
        loading: false,
        didRedirect: false,
    });

    const {email, password, error, success, loading, didRedirect} = values;

    const handleChange = email => event => {
        setValues({...values, error:false, [email]: event.target.value});
    };

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error:false, loading:true})
        signin({email, password})
        .then(data => {
            console.log(data);
            if(data.token){
                //let sessionToken = data.token;
                authenticate(data, () => {
                    console.log('token added')
                    setValues({
                        ...values,
                        didRedirect:true,
                    });
                });
            } else {
                //already session exists todo
                setValues({
                    ...values,
                    loading:false,
                })
            }
        })
        .catch(err => console.log(err))
    }

    const performRedirect = () => {
        if (isAuthenticated()){
            return <Redirect to="/user/dashboard" />
        }
    };

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    const successMessage = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div 
                    className='alert alert-success'
                    style={{display: success ? "":"none" }}
                    >
                        New account created successfully. Please <Link to="/signin">login now</Link>.
                    </div>
                </div>
            </div>
        )
    };

    const errorMessage = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div 
                    className='alert alert-danger'
                    style={{display: error ? "":"none" }}
                    >
                        Check all fields again
                    </div>
                </div>
            </div>
        )
    };

    const signInForm = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className='form-group'>
                            <label className='text-light'>Email</label>
                            <input type='email' className='form-control' value={email} onChange={handleChange("email")}/>
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Password</label>
                            <input type='password' className='form-control' value={password} onChange={handleChange("password")}/>
                        </div>
                        <button className='btn btn-success btn-block' onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }; 


  return (
    <Base title='Signin Page' description='Welcome to Signin page'>
        {loadingMessage()}
        {signInForm()}
        <p className='text-center'>
            {JSON.stringify(values)}
        </p>
        {performRedirect()}
    </Base>
  )
}

export default Signin;
