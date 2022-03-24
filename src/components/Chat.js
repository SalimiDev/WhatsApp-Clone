import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Compressor from 'compressorjs';
//Styles
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AddPhotoAlternate, ArrowBack, MoreVert } from '@material-ui/icons';
//hooks
import useChatMessages from '../hooks/useChatMessages';
import useRoom from '../hooks/useRoom';
//Firebase
import { createTimestamp, db, storage } from '../firebase';
//Components
import ChatMessages from './ChatMessages';
import MediaPreview from './MediaPreview';
import ChatFooter from './ChatFooter';

const Chat = ({ user, page }) => {
    //States
    const [image, setImage] = useState(null);
    const [src, setSrc] = useState('');
    const [input, setInput] = useState('');
    const [audioId, setAudioId] = useState('');

    //hooks & Routes
    const { roomId } = useParams();
    const messages = useChatMessages(roomId);
    const room = useRoom(roomId, user.uid);
    const navigate = useNavigate();

    //handling the functionality of images preview
    const showPreview = event => {
        const file = event.target.files[0];

        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setSrc(reader.result);
            };
        }
    };

    const closePreview = () => {
        setSrc('');
        setImage(null);
    };

    //handling the functionality of sending message
    const onChange = event => {
        setInput(event.target.value);
    };
    const sendMessage = async event => {
        event.preventDefault();
        if (input.trim() || (input === '' && image)) {
            setInput('');
            if (image) {
                closePreview();
            }
            const imageName = uuid();
            const newMessage = image
                ? {
                      name: user.displayName,
                      message: input,
                      uid: user.uid,
                      timestamp: createTimestamp(),
                      time: new Date().toUTCString(),
                      imageUrl: 'uploading',
                      imageName,
                  }
                : {
                      name: user.displayName,
                      message: input,
                      uid: user.uid,
                      timestamp: createTimestamp(),
                      time: new Date().toUTCString(),
                  };

            db.collection('users')
                .doc(user.uid)
                .collection('chats')
                .doc(roomId)
                .set({
                    name: room.name,
                    photoURL: room.photoURL || null,
                    timestamp: createTimestamp(),
                });

            const doc = await db.collection('rooms').doc(roomId).collection('messages').add(newMessage);

            if (image) {
                new Compressor(image, {
                    quality: 0.8,
                    maxWidth: 1920,
                    async success(result) {
                        setSrc('');
                        setImage(null);
                        await storage.child(imageName).put(result);
                        const url = await storage.child(imageName).getDownloadURL();
                        db.collection('rooms').doc(roomId).collection('messages').doc(doc.id).update({
                            imageUrl: url,
                        });
                    },
                });
            }
        }
    };

    return (
        <div className='chat'>
            <div style={{ height: page.height }} className='chat__background' />

            <div className='chat__header'>
                {page.isMobile && (
                    <IconButton onClick={navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                )}

                <div className='avatar__container'>
                    <Avatar src={room?.photoURL} />
                </div>

                <div className='chat__header--info'>
                    <h3 style={{ width: page.isMobile && page.width - 165 }}>{room?.name}</h3>
                </div>

                <div className='chat__header--right'>
                    <input id='image' style={{ display: 'none' }} accept='image/*' type='file' onChange={showPreview} />
                    <IconButton>
                        <label style={{ cursor: 'pointer', height: 24 }} htmlFor='image'>
                            <AddPhotoAlternate />
                        </label>
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className='chat__body--container'>
                <div className='chat__body' style={{ height: page.height - 68 }}>
                    <ChatMessages
                        messages={messages}
                        user={user}
                        roomId={roomId}
                        audioId={audioId}
                        setAudioId={setAudioId}
                    />
                </div>
            </div>
            <MediaPreview src={src} closePreview={closePreview} />
            <ChatFooter
                input={input}
                onChange={onChange}
                sendMessage={sendMessage}
                image={image}
                user={user}
                room={room}
                roomId={roomId}
            />
        </div>
    );
};

export default Chat;
