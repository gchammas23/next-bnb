import { useState } from 'react';

export default function RegistrationModal(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

    return (
        <>
            <h2>Sign up</h2>
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    alert(`Email: ${email} Password: ${password} Confirm Password: ${confirmPassword}`);
                }}>
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