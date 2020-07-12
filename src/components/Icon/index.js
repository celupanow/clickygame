import React from "react";
import "./style.css";

//Icon component displays the characters to be clicked

function Icon(props) {
    return (
        <div className="card">
            <div className="img-container">
                <span onClick={() => props.clickedCharacter(props.id)} className="clicked">
                    <img alt={props.name} src={props.image} />
                </span>
            </div>
        </div>
    );
}

export default Icon;