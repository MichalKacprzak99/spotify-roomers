import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom';
const RoomPage = () => {
    const [roomInfo, setRoomInfo] = useState(null)

    const {roomCode} = useParams();

    const getRoomInfo = async() => {
        const response = await fetch(`/api/get-room?code=${roomCode}`)

        const res = await response.json()
        if(response.status===200){
            console.log(res)
            setRoomInfo(res)
        } else {
            alert(res['Bad Request'])
        }
    }

    useEffect(() => {
        if(roomInfo == null){
            getRoomInfo()
        }
    }, []);

    return (
        <p>This is room page, {roomCode}</p>
    )
}

export default RoomPage