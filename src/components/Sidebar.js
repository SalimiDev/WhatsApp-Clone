import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, Home, Message, PeopleAlt } from '@material-ui/icons';
import { ExitToApp } from '@material-ui/icons';
import { auth } from '../firebase';
import { Routes, Route, NavLink } from 'react-router-dom';
//Components
import SidebarList from './SidebarList';
//hooks
import useRooms from '../hooks/useRooms';
import useUsers from '../hooks/useUsers';
import useChats from '../hooks/useChats';

const Sidebar = ({ user, page }) => {
    //hooks
    const rooms = useRooms();
    const users = useUsers(user);
    const chats = useChats(user);
    //state
    const [menu, setMenu] = useState(1);
    const [searchResults, setSearchResults] = useState([]);
    //SignOut handling
    const SignOutOnClick = () => {
        auth.signOut();
    };
    let Nav;
    if (page.isMobile) {
        Nav = NavLink;
    } else {
        Nav = props => (
            <div className={props.activeClass ? styles.sidebar__menuSelected : ''} onClick={props.onClick}>
                {props.children}
            </div>
        );
    }
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
            <div className={styles.sidebar__menu}>
                <Nav to='/chats' activeClassName='sidebar__menuSelected' onClick={() => setMenu(1)} activeClass={menu === 1}>
                    <div className={styles.sidebar__menuHome}>
                        <Home />
                        <div className={styles.sidebar__menuLine} />
                    </div>
                </Nav>
                <Nav to='/rooms' activeClassName='sidebar__menuSelected' onClick={() => setMenu(2)} activeClass={menu === 2}>
                    <div className={styles.sidebar__menuRooms}>
                        <Message />
                        <div className={styles.sidebar__menuLine} />
                    </div>
                </Nav>
                <Nav to='/users' activeClassName='sidebar__menuSelected' onClick={() => setMenu(3)} activeClass={menu === 3}>
                    <div className={styles.sidebar__menuUsers}>
                        <PeopleAlt />
                        <div className={styles.sidebar__menuLine} />
                    </div>
                </Nav>
            </div>
            {page.isMobile ? (
                <Routes>
                    <Route path='/chats' element={<SidebarList title='Chats' data={chats} />} />
                    <Route path='/rooms' element={<SidebarList title='Rooms' data={rooms} />} />
                    <Route path='/users' element={<SidebarList title='Users' data={users} />} />
                    <Route path='/search' element={<SidebarList title='Search Results' data={searchResults} />} />
                </Routes>
            ) : menu === 1 ? (
                <SidebarList title='Chats' data={chats} />
            ) : menu === 2 ? (
                <SidebarList title='Rooms' data={rooms} />
            ) : menu === 3 ? (
                <SidebarList title='Users' data={users} />
            ) : menu === 4 ? (
                <SidebarList title='Search Results' data={searchResults} />
            ) : null}
        </div>
    );
};

export default Sidebar;
