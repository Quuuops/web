import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginForm from '../components/User/js/LoginForm';

const LoginRoutes = () => (
    <Routes>
        <Route path="/login" element={<LoginForm/>}/>
    </Routes>

);

export default LoginRoutes;
