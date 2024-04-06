export default function Profiles() {
    return (
        <div id="Profiles">
            {Item()}
        </div>
    )
}

function Item(){
    return(
        <div className="flex"> 
            <div className="item">
                <img src="https://via.placeholder.com/150" alt=""/>

                <div className="info">
                    <h3 className = 'name text-dark'>Name</h3>
                </div>
            </div>
        </div>
    )
}