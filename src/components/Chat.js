import React from 'react';
import { useParams } from 'react-router-dom';
//hooks
import useRoom from '../hooks/useRoom';

const Chat = ({ user, page }) => {
    //hooks & Routes
    const { roomId } = useParams();
    const room = useRoom(roomId, user.uid);

    return <div>chats</div>;
};

export default Chat;
