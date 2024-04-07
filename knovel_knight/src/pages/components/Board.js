import React from "react";

import Profiles from "./Profiles";

export default function Board() {

    const handleClick = (e) => {
        console.log(e.target)
    }

    return(
        <div className="Board">
            <h1 className="Leaderboard">Leaderboard</h1>
            
            <Profiles></Profiles>
        </div>
    )


}