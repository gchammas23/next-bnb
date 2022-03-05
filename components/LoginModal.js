import { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useStoreActions } from 'easy-peasy';

export default function LoginModal(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setLoggedIn = useStoreActions((actions) => actions.auth.setLoggedIn);
    const setHideModal = useStoreActions((actions) => actions.modals.setHideModal);

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await axiosInstance.post('/auth/login', {
            email,
            password
        });

        if (response.data.error) {
            alert(response.data.message);
        } else {
            setLoggedIn(true);
            setHideModal(true);
        }
    }

    return (
        <>
            <h2>Log in</h2>
            <div>
                <form onSubmit={handleLogin}>
                    <input id='email' type='email' placeholder='Email address' onChange={handleEmailChange}/>
                    <input id='password' type='password' placeholder='Password' onChange={handlePasswordChange}/>
                    <button>Log in</button>

                    <p>
                        Don't have an account?{' '}
                        <a href='#' onClick={() => props.showSignUp() }>Sign up</a>
                    </p>
                </form>
            </div>
        </>
    )
}