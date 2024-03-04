import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import "../css/LoginForm.css";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import Api from "../../Api/api";

const api = Api()

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(true); // Состояние для отслеживания режима формы
    const navigate = useNavigate();
    const [error, setError] = useState('');


    const handleLogin = async () => {
        try {
            const response = await api.post('auth/token/login/', {
                username: username,
                password: password,
            });

            if (response.auth_token) {
                localStorage.setItem('token', response.auth_token);
                navigate('/product/');
                window.location.reload();

            } else {
                console.error('Детали ошибки:', response.data);
            }
        } catch (error) {
            console.error('Ошибка входа:', error);
        }
    };

    const clearError = () => {
        setError('');
    };

    const handleRegister = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            if (!isValidEmail(email)) {
                setError('Invalid email address');
                return;
            }

            const response = await api.post('api/auth/users/', {
                email: email,
                username: username,
                password: password,
            }, null, null, false);
            if (response.status === 201) {
                console.log('Registration successful:', response.data);
                navigate('/products/');
            } else {
                console.error('Registration error:', response.data);
                setError('Registration error'); // Устанавливаем сообщение об ошибке
            }
        } catch (error) {
            console.error('Network error:', error.request.response);
            setError( error.request.response); // Устанавливаем сообщение об ошибке
        }
    };
    const toggleFormMode = () => {
        setIsLoginForm(!isLoginForm);
    };


    const isValidEmail = (email) => {
        // Регулярное выражение для проверки валидности электронной почты
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
    }, [username, password]);

    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
                    <MDBCard className='bg-dark text-white my-5 mx-auto'
                             style={{borderRadius: '1rem', maxWidth: '400px'}}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                            <h2 className="fw-bold mb-2 text-uppercase">{isLoginForm ? 'Login' : 'Register'}</h2>
                            <p className="text-white-50 mb-5">Please {isLoginForm ? 'enter your login and password' : 'fill out the registration form'}!</p>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                    <button type="button" className="btn-close" aria-label="Close"
                                            onClick={clearError}></button>
                                </div>
                            )}

                            {isLoginForm ? (
                                <>
                                    <MDBInput
                                        label='Email address'
                                        labelClass='text-white' // Примените стили к самому лейблу
                                        id='formControlLg'
                                        type='email'
                                        size="lg"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <MDBInput
                                        label='Password'
                                        labelClass='text-white' // Примените стили к самому лейблу
                                        id='formControlLg'
                                        type='password'
                                        size="lg"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot
                                        password?</a></p>
                                    <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={handleLogin}>
                                        Login
                                    </MDBBtn>
                                </>
                            ) : (
                                <>
                                    <MDBInput
                                        label='Email address'
                                        labelClass='text-white'
                                        id='register-email'
                                        type='email'
                                        size="lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mb-3"
                                    />
                                    <MDBInput
                                        label='Username'
                                        labelClass='text-white'
                                        id='username'
                                        type='text'
                                        size="lg"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="mb-3"
                                    />
                                    <MDBInput
                                        label='Password'
                                        labelClass='text-white'
                                        id='register-password'
                                        type='password'
                                        size="lg"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mb-3"
                                    />
                                    <MDBInput
                                        label='Confirm Password'
                                        labelClass='text-white'
                                        id='confirm-password'
                                        type='password'
                                        size="lg"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="mb-3"
                                    />
                                    {password !== confirmPassword &&
                                        <p className="text-danger">Passwords do not match</p>}

                                    <MDBBtn outline className='mx-2 px-5' color='white' size='lg'
                                            onClick={handleRegister}>
                                        Register
                                    </MDBBtn>


                                </>
                            )}

                            <div>
                                <p className="mb-0">{isLoginForm ? "Don't have an account?" : "Already have an account?"}
                                    <button onClick={toggleFormMode}
                                            className="text-dark-50 fw-bold">{isLoginForm ? 'Sign Up' : 'Sign In'}</button>
                                </p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
export default LoginForm;
