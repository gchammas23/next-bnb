import { useState } from 'react';
import axios from 'axios';

export default function LoginModal(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        const response = await axios.post('/api/auth/login', {
            email,
            password
        });

        console.log(response);

        if (response.data.status === 'error') {
            alert(response.data.message);
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