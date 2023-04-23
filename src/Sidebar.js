import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@mui/material';
import { DonutLarge, SearchOutlined } from '@mui/icons-material';
import { ChatBubble } from '@mui/icons-material';
import { MoreVert } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
	const [rooms, setRooms] = useState([]);
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		const unsubscribe = db.collection('Rooms').onSnapshot((snapshot) =>
			setRooms(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data()
				}))
			)
		);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar src={user?.photoURL} />
				<div className='sidebar__headerRight'>
					<IconButton>
						<DonutLarge />
					</IconButton>
					<IconButton>
						<ChatBubble />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className='sidebar__search'>
				<div className='sidebar__searchContainer'>
					<SearchOutlined />
					<input placeholder='Search or start new chats' type='text' />
				</div>
			</div>

			<div className='sidebar__chats'>
				<SidebarChat addNewChat />
				{rooms.map((room) => (
					<SidebarChat key={room.id} id={room.id} name={room.data.name} />
				))}
			</div>
		</div>
	);
}

export default Sidebar;
