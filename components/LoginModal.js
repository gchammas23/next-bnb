export default function LoginModal(props) {
    return (
        <>
            <h2>Log in</h2>
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    alert('Log in!');
                }}>
                    <input id='email' type='email' placeholder='Email address'/>
                    <input id='password' type='password' placeholder='Password'/>
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