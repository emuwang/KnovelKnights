export default function Profiles() {
    return (
        <div id="Profiles">
            {Item()}
        </div>
    )
}

function Item(){
    const items = [
        { name: 'Peter', imgSrc: 'pictures/kid1.jpg'},
        { name: 'John', imgSrc: 'pictures/kid1.jpg'},
        { name: 'Mary', imgSrc: 'pictures/kid1.jpg'},
    ];
    return(
        <div className="flex"> 
            {items.map((item, index) => (
                <div key={index} className="item">
                    <img src={require(`./${item.imgSrc}`)} alt={item.name}/>

                    <div className="info">
                        <h3 className = 'name text-dark'>{item.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    )
}