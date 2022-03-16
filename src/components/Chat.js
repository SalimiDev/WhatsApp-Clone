import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//Styles
import styles from './Chat.module.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AddPhotoAlternate, ArrowBack, MoreVert } from '@material-ui/icons';
//hooks
import useRoom from '../hooks/useRoom';
//Components
import MediaPreview from './MediaPreview';

const Chat = ({ user, page }) => {
    //States
    const [image, setImage] = useState(null);
    const [src, setSrc] = useState('');

    //hooks & Routes
    const { roomId } = useParams();
    const room = useRoom(roomId, user.uid);
    const navigate = useNavigate();

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

    return (
        <div className={styles.chat}>
            <div style={{ height: page.height }} className={styles.chat__background} />

            <div className={styles.chat__header}>
                {page.isMobile && (
                    <IconButton onClick={navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                )}

                <div className={styles.avatar__container}>
                    <Avatar src={room?.photoURL} />
                </div>

                <div className={styles.chat__headerInfo}>
                    <h3 style={{ width: page.isMobile && page.width - 165 }}>{room?.name}</h3>
                </div>

                <div className={styles.chat__headerRight}>
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
                <MediaPreview src={src} closePreview={closePreview} />
            </div>
        </div>
    );
};

export default Chat;
