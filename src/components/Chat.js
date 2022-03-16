import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//Styles
import styles from './Chat.module.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AddPhotoAlternate, ArrowBack, MoreVert } from '@material-ui/icons';
//hooks
import useRoom from '../hooks/useRoom';

const Chat = ({ user, page }) => {
    //hooks & Routes
    const { roomId } = useParams();
    const room = useRoom(roomId, user.uid);
    const navigate = useNavigate();

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
                    <input id='image' style={{ display: 'none' }} accept='image/*' type='file' />
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
        </div>
    );
};

export default Chat;
