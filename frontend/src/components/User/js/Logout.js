import React from 'react';
import { useNavigate } from 'react-router-dom';
import Api from "../../Api/api";

const api = Api()

const LogoutButton = () => {
    const navigate = useNavigate();
    const HandleLogout = async () => {
        try {
            const response = await api.post('auth/token/logout/');
                localStorage.removeItem('token');
                navigate('/login');
                window.location.reload();
            console.log(response.data);  // Сообщение об успешном выходе
        } catch (error) {
            console.error('Ошибка выхода', error);
        }
    };

    return (
        <button onClick={HandleLogout}>Logout</button>
    );
}

export default LogoutButton;
