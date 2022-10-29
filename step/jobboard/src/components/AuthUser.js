import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {

    const adminRole=1
    const recruiterRole=2
    const jobseekerRole=3

    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const isJobseeker = () => {

        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        if (user_detail && user_detail.role_id === jobseekerRole) {
            return true
        }
        return false;

    }


    const isAdmin = () => {

        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        if (user_detail && user_detail.role_id === adminRole) {
            return true
        }
        return false;

    }


    const isRecruiter = () => {

        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        if (user_detail && user_detail.role_id === recruiterRole) {
            return true
        }
        return false;

    }


    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        navigate('/');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/Login');
    }

    const http = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        logout,
        isJobseeker,
        isAdmin,
        isRecruiter
    }
}
