import { useRef, useState, useEffect, useContext} from 'react';
import AuthContext from "./context/AuthProvider" ;
import Register from './Register';

import axios from './api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();// Set focus on userRef when it loads
    const errRef = useRef();// Focus on error to be announced

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');s
    const [success, setSuccess] = useState('');
    
    //sets focus on first input
    useEffect(() => {
        userRef.current.focus();
    }, []) 
    //empty error message if inputs are changed
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({user, pwd}),
                {
                    headers: { 'Context-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            
            const accessToken = response?.data?.accessToken;
            const roles = response?.data.roles;
            setAuth({user, pwd, roles, accessToken});
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <> 
            {success ? (
                <section>
                    <h1>You are logged in</h1>
                    <br />
                    <p>
                        <Link to="/home">Go To Home</Link>
                    </p>
                </section>
            ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input 
                    type="text" 
                    id="username" 
                    ref = {userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                /> 
                <label htmlFor="password">Password: </label>
                <input 
                    //gives dots for password
                    type="password" 
                    id="password" 
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
                
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    {/*put router link for register here*/}
                    <Link to="/register">Register</Link>
                </span>
            </p>
        </section>
            )}
            </>

    )
}

export default Login