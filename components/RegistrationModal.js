export default function RegistrationModal(props) {
    return (
        <>
            <h2>Sign up</h2>
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    alert('Sign up!');
                }}>
                    <input id='email' type='email' placeholder='Email address'/>
                    <input id='password' type='password' placeholder='Password'/>
                    <input id='confirmPassword' type='password' placeholder='Confirm your password'/>
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