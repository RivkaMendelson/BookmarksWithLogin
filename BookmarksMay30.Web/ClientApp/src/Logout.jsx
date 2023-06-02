﻿import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Logout = () => {

    const { setUser } = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
        const doLogout = async () => {
            await axios.post('/api/account/logout');
            setUser(null);
            navigate('/');
        }
        doLogout();
    }, []);

    return (<></>);
}

export default Logout;