import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from 'react-router-dom';

/**
 *  Check that username:
 *  1. Starts with a letter (non-case sensitive)
 *  2.  Is between length 4-24
 */
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

/**
 *  Check that password has:
 *  1. At least one lowercase char
 *  2. At least one capital char
 *  3. At least one number
 *  4. At least one special character
 *  5. Is between length 8-24
 */ 
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/insertuser';

const Register = () => {
    const userRef = useRef();                               // Set focus on userRef when it loads
    const errRef = useRef();                                // Focus on error to be announced

    const [user, setUser] = useState('');                   // User state tied to user input
    const [validName, setValidName] = useState(false);      // Boolean for if name is valid
    const [userFocus, setUserFocus] = useState(false);      // Whether focus is on that input field or not

    const [pwd, setPwd] = useState('');                     // For password creation
    const [validPwd, setValidPwd] = useState(false);  
    const [pwdFocus, setPwdFocus] = useState(false);  

    const [matchPwd, setMatchPwd] = useState('');           // For password matching         
    const [validMatch, setValidMatch] = useState(false);  
    const [matchFocus, setMatchFocus] = useState(false); 

    const [errMsg, setErrMsg] = useState('');               // Error handling        
    const [success, setSuccess] = useState(false);      

    // Sets focus when component loads, dependency arr populated after loading
    useEffect(() => {
        userRef.current.focus();                            // Set focus to username input
    }, [])

    // Validate the username, depends on having valid name now
    useEffect(() => {
        const result = USER_REGEX.test(user);               // Result for logging
        console.log(result);
        console.log(user);
        setValidName(result);                           
    }, [user])

    // Validate the password (format + matching)
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);                 // Result for logging
        console.log(result);
        console.log(pwd);
        setValidPwd(result);   
        const match = pwd === matchPwd;                   
        setValidMatch(match);                        
    }, [pwd, matchPwd])                                     // If either of these changes, pwd stuff will update
    
    useEffect(() => {
        setErrMsg('');                                      // Clear out error msg since it has been read                     
    }, [user, pwd, matchPwd])                               // Will check if any of these 3 fields change 
                                                            // (Eg. updating password due to missing special char)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);

        if (!v1 || !v2) {                                   // Second layer of error checking for security
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            // Since we have an async function, we can use await
            const userData = { user: user, pwd: pwd};

            axios
            .post('http://localhost:3001/insertuser', userData)
            .then(()=> console.log(userData))
            .catch(err=> {
                console.error(err);
            });

            // indian guy code that doesnt work
            // const result = await fetch('http://localhost:3001/insertuser', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(userData)
            // })
            // const resJson = await result.json()
            // console.log(resJson)
            
            /*
            original code i think?
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user: user, pwd: pwd }),
                {
                    headers: { 'Content-Type': 'application/application.json',
                    withCredentials: true
                }
                })
                */
                setSuccess(true);
                // clear input fields
                setUser('');
                setPwd('');
                setMatchPwd('');
        } catch (e) {
            if (!e?.response) {
                setErrMsg('No Server Response');
            } else if (errMsg.response.status === 409) {
              setErrMsg('Username Taken');  
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    }

    return(
        <>
            { success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/login">Sign In</Link>
                    </p>
                </section>
        ): (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>   {/* If error message exists, else it is positioned offscreen (Can change to none) */}
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">                                                                      {/* id of username input */}
            
            Username:
            <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
            </span>

            {/**
             * Check for valid name or if username exists before hiding
             */}
            <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes}/>
            </span>
            </label>
            {/**
             * id matches htmlFor
             * ref lets us set focus on the input when component loads
             * onChange provides event and sets user state (ties input to user state); required input
             * aria-invalid tells if the field needs to be adjusted before moving on
             * aria-describedby lets us descripe the input field 
             * aria attributes are for accessibility :)
             */}
            <input
              type="text"
              id="username"
              ref={userRef}                                                                                
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}   
              value={user}                                                 
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              />
            {/**
             * className: if focused on user field, user is not empty, and the name is not valid
             */}
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters. <br/>
                Must begin with a letter. <br/>
                Letters, numbers, underscores, hyphens allowed.
            </p>
            <label htmlFor="password">                                                                      {/* id of username input */}
            
            Password:
            <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes}/>
            </span>
            </label>

            <input
              type="password"
              id="password"                                                                              
              onChange={(e) => setPwd(e.target.value)}  
              value={pwd}                                                  
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />

            <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters. <br/>
                Must include uppercase and lowercase letters, a number and a special character. <br/>
                Allowed special characters: <span aria-label="exclamation mark">!</span> 
                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> 
                <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>
            <label htmlFor="confirm_pwd">                                                                      {/* id of username input */}
            
            Confirm Password:
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes}/>
            </span>
            </label>

            <input
              type="password"
              id="confirm_pwd"                                                                              
              onChange={(e) => setMatchPwd(e.target.value)}  
              value={matchPwd}                                                  
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />

            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Passwords do not match.
            </p>  
            <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                Sign Up
            </button>                    
        </form>
        <p>
            Already registered? <br/>
            <span className="line">
                <Link to="/login">Sign In</Link>
            </span>
        </p>
        </section>
    )}
    </>
    )
}

export default Register;