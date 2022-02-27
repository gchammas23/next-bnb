export default function LoginModal(props) {
    return (
        <>
            <h2>Log in</h2>
            <div>
                <form>
                    <input id='email' type='email' placeholder='Email address'/>
                    <input id='password' type='password' placeholder='Password'/>
                    <button>Log in</button>

                    <p>
                        Don't have an account? {' '}
                        <a href='javascript:;' onClick={() => props.showSignUp() }></a>
                    </p>
                </form>
            </div>
        </>
    )
}