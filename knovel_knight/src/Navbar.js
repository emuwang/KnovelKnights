import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
    const path = window.location.pathname
    return <nav className="nav">
        <Link to="/" className="site-title">
            Knovel Knights
        </Link>
        <u1>
            <BoldenLink to="books">Books</BoldenLink>
            <BoldenLink to="leaderboard">Leaderboard</BoldenLink>
            <BoldenLink to="events">Events</BoldenLink>
        </u1>
    </nav>
}

function BoldenLink( {to, children, ...props} ) {

    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}> 
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}