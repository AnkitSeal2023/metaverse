// import React from "react";
import { io } from "socket.io-client";
var socket = io('http://localhost:3001');
export default function Land(){
    function joinroom()
    {
        let room=document.getElementById("joinRoom");
        let roomVal;
        if(room)
        {
            roomVal= (room as HTMLInputElement).value;
        }
        socket.emit("joinroom", roomVal)
    }
    function game()
    {
        window.location.href = "http://localhost:5173/game.html";
    }
    console.log("initialized socket");
    socket.emit("checkrooms");
    return(
        <>
            <input id="joinRoom" placeholder="enter room val"/>
            <button onClick={joinroom}>Join Room</button>
            <button onClick={game}>Game</button>
        </>
        )
}