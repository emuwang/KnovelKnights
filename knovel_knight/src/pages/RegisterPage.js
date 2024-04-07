import '../App.css';
import Register from './Register';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    return(
        <div className="RegisterPage">
            <h1>hello</h1>
            <Link to="./Register"> Register </Link>
        </div>
    );
}