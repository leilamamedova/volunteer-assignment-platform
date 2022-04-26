import React from 'react';
import { Outlet } from 'react-router-dom';
import './AuthLayout.scss';

const AuthLayout = () => {
    return (
        <div className='auth-top'>  
            <div className='auth-box'>
                <Outlet/>
            </div>    
        </div>
    )
}

export default AuthLayout;