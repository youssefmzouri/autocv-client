import React, {useState} from 'react';
import Notification from '../components/Notification';

const Login = ({doLogin, handleUserSession}) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await doLogin({
                email: userEmail,
                password: userPassword
            });

            window.localStorage.setItem (
                'loggedAutoCvAppUser',
                JSON.stringify(user)
            );
            
            handleUserSession(user);
            setUserEmail('');
            setUserPassword('');
        } catch (e) {
            console.log('Wrong credentials');
            setErrorMessage('Wrong credentials');
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        }
    }

    return (
        <div className="loginFormContainer">
            <Notification message={errorMessage} />
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        value={userEmail}
                        name="email"
                        placeholder="User email"
                        onChange={({target}) => setUserEmail(target.value)}
                    />
                    </div>
                    <div>
                    <input
                        type="password"
                        value={userPassword}
                        name="password"
                        placeholder="User password"
                        onChange={({target}) => setUserPassword(target.value)}
                    />
                </div>
                <button>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;