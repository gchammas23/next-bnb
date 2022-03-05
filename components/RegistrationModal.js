import { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useStoreActions } from 'easy-peasy';

export default function RegistrationModal(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

    const handleConfirmPasswordChange = (e) => {
        e.preventDefault();
        setConfirmPassword(e.target.value);
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        const response = await axiosInstance.post('/api/auth/register', {
            email,
            password,
            confirmPassword
        });
        alert(response.data.message);

        if (response.data.error) {
            alert(response.data.message);
        } else {
            setLoggedIn(true);
            setHideModal(true);
        }
    }

    return (
        <>
            <h2>Sign up</h2>
            <div>
                <form onSubmit={handleRegistration}>
                    <input id='email' type='email' placeholder='Email address' onChange={handleEmailChange}/>
                    <input id='password' type='password' placeholder='Password' onChange={handlePasswordChange}/>
                    <input id='confirmPassword' type='password' placeholder='Confirm your password' onChange={handleConfirmPasswordChange}/>
                    <button>Sign up</button>

                    <p>
                        Already have an account?{' '}
                        <a href='#' onClick={() => props.showLogin()}>Log in</a>
                    </p>
                </form>
            </div>
        </>
    )
}