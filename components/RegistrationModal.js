export default function RegistrationModal(props) {
    return (
        <>
            <h2>Sign up</h2>
            <div>
                <form>
                    <input id='email' type='email' placeholder='Email address'/>
                    <input id='password' type='password' placeholder='Password'/>
                    <input id='confirmPassword' type='password' placeholder='Confirm your password'/>
                    <button>Sign up</button>

                    <p>
                        Already have an account? {' '}
                        <a href='javascript:;' onClick={() => props.showLogin()}></a>
                    </p>
                </form>
            </div>
        </>
    )
}