import { useState } from "react";

export default function PlayerList({ initialName, symbol, isActive, onChangeName }){
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);

    let editName = <span className="player-name">{name}</span>;

    if(isEditing){
        editName = <input type="Text" required placeholder={name} onChange={handleChange}/>
    }

    function handleChange(event){
        setName(event.target.value);
    }

    function handleEditClick(){
        
        setIsEditing((editing) => !isEditing);
        if(isEditing){
            onChangeName(symbol, name);
        }
    }

    return(
        <li className={isActive? 'active' : undefined}>
            <span className="player">
                {editName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}