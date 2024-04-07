import { useRef, useState, useEffect, useContext} from 'react';
import AuthContext from "../context/AuthProvider" ;
import Register from './Register';

import { Link } from 'react-router-dom';
import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const userRef = useRef();// Set focus on userRef when it loads
    const errRef = useRef();// Focus on error to be announced

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [auth, setAuth] = useState('');
    const [success, setSuccess] = useState('');
    
    //sets focus on first input
    useEffect(() => {
        userRef.current.focus();
    }, []) 

    useEffect(() => {
        setAuth(false);
    }, [auth])

    //empty error message if inputs are changed
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = { user: user, pwd: pwd };

            const response = axios
            .post('http://localhost:3001/userauth', userData)  
            .then(response=> {
                console.log("response: %s", response.data)
                if (response.data.localeCompare("User does not exist") == 0)
                    setErrMsg(response.data);
                else if (response.data.localeCompare("Incorrect password") == 0)
                    setErrMsg(response.data);
                else if (response.data.localeCompare("Good to go") == 0)
                    setSuccess(true);
            })
            .catch(e=> {
                console.error(e);
            });
            
            setUser('');
            setPwd('');
        } catch (e) {
            if (!e?.response) {
                setErrMsg('No Server Response');
            } else if (e.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (e.response?.status === 401) {
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
                        <Link to="/">Go To Home</Link>
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