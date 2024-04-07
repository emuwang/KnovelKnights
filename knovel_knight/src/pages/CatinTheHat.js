import book from './components/pictures/catinthehat.jpg';
export default function CatinTheHat() {
    return (
        <div className="Review">
            <h1>Cat in the Hat - This Changed my life</h1>
            <p>
                Wow, where do I even begin... I have loved this book ever since I first read it. The way the cat wears the hat and does trick. Your silky smooth touch as you juggle the fish, and that red wood box. 
            </p>
            <img class="center-fit" src={book} alt='cat in teh hat'></img>
        </div>
    )
}