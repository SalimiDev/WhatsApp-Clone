import React from 'react';
import styles from './Sidebar.module.css';
import { CircularProgress } from '@material-ui/core';
import { CancelOutlined, SearchOutlined } from '@material-ui/icons';
import SidebarListItem from './SidebarListItem';
const SidebarList = ({ title, data }) => {
    if (!data) {
        return (
            <div className={`${styles.loader__container} ${styles.sidebarLoader}`}>
                <CircularProgress />
            </div>
        );
    }

    if (!data.length && title === 'Search Results') {
        return (
            <div className={styles.no_result}>
                <div>
                    <SearchOutlined />
                    <div className={styles.cancel_root}>
                        <CancelOutlined />
                    </div>
                </div>
                <h2>No {title}</h2>
            </div>
        );
    }

    return (
        <div className={styles.sidebar__chatContainer}>
            <h2>{title}</h2>
            {data.map(item => (
                <SidebarListItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default SidebarList;
