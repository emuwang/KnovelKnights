import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="Home">
            <h1>Welcome to Knovel Knights!</h1>
            <button class="login">Login</button>
            <button class="register"><Link to="/register">Register</Link></button>
        </div>
        
    )
}