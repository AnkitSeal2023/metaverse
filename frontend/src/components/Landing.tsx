import React from "react";
import { io, Socket } from "socket.io-client";
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