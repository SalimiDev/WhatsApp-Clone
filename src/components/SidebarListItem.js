import React from 'react';
import styles from './SidebarListItem.module.css';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SidebarListItem = ({ item }) => {
    return (
        <Link className={styles.link} to={`/room/${item.id}`}>
            <div className={styles.sidebar__chat}>
                <div className={styles.avatar__container}>
                    <Avatar
                        style={{
                            width: 45,
                            height: 45,
                        }}
                        src={item.photoURL || `https://avatars.dicebear.com/api/human/${item.id}.svg`}
                    />
                </div>
                <div className={styles.sidebar__chatInfo}>
                    <h2>{item.name}</h2>
                </div>
            </div>
        </Link>
    );
};

export default SidebarListItem;
