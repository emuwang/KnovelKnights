import React from "react";

import Profiles from "./Profiles";

export default function Board() {

    const handleClick = (e) => {
        console.log(e.target)
    }

    return(
        <div className="Board">
            <h1 className="Leaderboard">Leaderboard</h1>

            <div className="Duration">
                <button onClick={handleClick} data-id='7'>7 Days</button>
                <button onClick={handleClick} data-id= '30'>30 Days</button>
                <button onClick={handleClick} data-id='0'>All-Time</button>
            </div>
            <Profiles></Profiles>
        </div>
    )


}