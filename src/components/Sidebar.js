import React from 'react';
import styles from './Sidebar.module.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { ExitToApp } from '@material-ui/icons';
import { auth } from '../firebase';

const Sidebar = ({ user, page }) => {
    const SignOutOnClick = () => {
        auth.signOut();
    };
    return (
        <div className={styles.sidebar} style={{ minHeight: page.isMobile ? page.height : 'auto' }}>
            <div className={styles.sidebar__header}>
                <div className={styles.sidebar__headerLeft}>
                    <Avatar src={user?.photoURL} />
                    <h4>{user?.displayName}</h4>
                </div>
                <div className={styles.sidebar__headerRight}>
                    <IconButton onClick={SignOutOnClick}>
                        <ExitToApp />
                    </IconButton>
                </div>
            </div>
            <div className={styles.sidebar__search}>
                <form className={styles.sidebar__searchContainer}>
                    <SearchOutlined />
                    <input type='text' id='search' placeholder='Search for users or rooms' />
                </form>
            </div>
        </div>
    );
};

export default Sidebar;
