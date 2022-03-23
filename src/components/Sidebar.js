import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, ExitToApp, Home, Message, PeopleAlt, Add } from '@material-ui/icons';
import { auth, createTimestamp, db } from '../firebase';
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
    //Add new room handling
    const createRoomOnClick = () => {
        const roomName = prompt('Enter the room name');
        if (roomName.trim()) {
            db.collection('rooms').add({
                name: roomName,
                timeStamp: createTimestamp(),
            });
        }
    };
    //Search users and  rooms handling
    const searchUsersAndRooms = async event => {
        event.preventDefault();
        const query = event.target.elements.search.value;
        const userSnapshot = await db.collection('users').where('name', '==', query).get();
        const roomSnapshot = await db.collection('rooms').where('name', '==', query).get();
        const userResults = userSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        const roomResults = roomSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        const searchResults = [...userResults, ...roomResults];
        setMenu(4);
        setSearchResults(searchResults);
    };

    let Nav;
    if (page.isMobile) {
        Nav = NavLink;
    } else {
        Nav = props => (
            <div className={props.activeclass ? styles.sidebar__menuSelected : ''} onClick={props.onClick}>
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
                <form onSubmit={searchUsersAndRooms} className={styles.sidebar__searchContainer}>
                    <SearchOutlined />
                    <input type='text' id='search' placeholder='Search for users or rooms' />
                </form>
            </div>
            <div className={styles.sidebar__menu}>
                <Nav to='/chats' className={({isActive})=>isActive? styles.sidebar__menuSelected :""} onClick={() => setMenu(1)} activeclass={menu===1}>
                    <div className={styles.sidebar__menuHome}>
                        <Home />
                        <div className={styles.sidebar__menuLine} />
                    </div>
                </Nav>
                <Nav to='/rooms'  className={({isActive})=>isActive? styles.sidebar__menuSelected :""} onClick={() => setMenu(2)} activeclass={menu === 2}>
                    <div className={styles.sidebar__menuRooms}>
                        <Message />
                        <div className={styles.sidebar__menuLine} />
                    </div>
                </Nav>
                <Nav to='/users'className={({isActive})=>isActive? styles.sidebar__menuSelected :""} onClick={() => setMenu(3)} activeclass={menu === 3}>
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
            <div className={styles.sidebar__chatAddRoom}>
                <IconButton onClick={createRoomOnClick}>
                    <Add />
                </IconButton>
            </div>
        </div>
    );
};

export default Sidebar;
