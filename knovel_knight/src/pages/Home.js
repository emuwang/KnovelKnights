import { Link } from 'react-router-dom';
import reviewFiendishCodex from './CatinTheHat';

export default function Home() {
    return (
        <div className="Home">
            <h1>Welcome to Knovel Knights!</h1>
            <button class="login">Login</button>
            <button class="register"><Link to="/register">Register</Link></button>
            <div className="ArticleThing">
            <container className="articlething">
                <article className="article1">
                    <h2>Popular Reviews</h2>
                    <u1 className="reviewNames">
                        <li><h5><Link to="/CatintheHat">Cat in the Hat - This changed my life</Link></h5></li>
                        <li><h5>Harry Potter - wow!!!</h5></li>
                        <li><h5>Lorax - Wonderful story</h5></li>
                        <li><h5>Percy Jackson - I love lightning</h5></li>
                        <li><h5>Hunger Games - hungry for more</h5></li>
                        <li><h5>Hunger Games 2 - ok maybe not</h5></li>
                        <li><h5>Where's Waldo - WORST BOOK EVER</h5></li>
                        <li><h5>Naruto - Dattebayo!</h5></li>
                        <li><h5>Chicken Noodle Soup for the Soul - Hungies</h5></li>
                        <li><h5>I Survived Hiroshima - this is deep</h5></li>
                    </u1>
                </article>
  
                <article className="article2">
                    <h2>Recent Reviews</h2>
                    <u1 className="reviewNames">
                        <li><h5>Harry Potter 7 - (SPOILERS)a great book!</h5></li>
                        <li><h5>Bible - Waiting for the sequel</h5></li>
                        <li><h5>Kite Runner - life changing</h5></li>
                        <li><h5>Maze Runner - not life changing</h5></li>
                        <li><h5>Huckleberry Finch - A classic</h5></li>
                        <li><h5>Hobbit - Wonderful adventure story</h5></li>
                        <li><h5>One Piece - i love japanese graphic novels</h5></li>
                        <li><h5>Green Eggs and Ham - TLDR Summary</h5></li>
                        <li><h5>Dune - Comparison with Movie</h5></li>
                        <li><h5>TinTin -  Dated for its time</h5></li>
                    </u1>
                </article>
            </container>
            </div>
        </div>
        
    )
}