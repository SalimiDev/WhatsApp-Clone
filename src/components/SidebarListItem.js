import React from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SidebarListItem = ({ item }) => {
    return (
        <Link to={`/room/${item.id}`}>
            <div>
                <div>
                    <Avatar
                        style={{
                            width: 45,
                            height: 45,
                        }}
                        src={item.photoURL || `https://avatars.dicebear.com/api/human/${item.id}.svg`}
                    />
                </div>
                <div>
                    <h2>{item.name}</h2>
                </div>
            </div>
        </Link>
    );
};

export default SidebarListItem;
