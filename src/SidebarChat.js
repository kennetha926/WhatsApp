import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import { Avatar } from '@mui/material';
import db from './firebase';
import { Link } from 'react-router-dom';
import { ROOMS } from './util/constants';

function SidebarChat({ id, name, addNewChat }) {
	const [seed, setSeed] = useState('');
	const [messages, setMessages] = useState('');

	useEffect(() => {
		if (id) {
			db.collection(ROOMS)
				.doc(id)
				.collection('messages')
				.orderBy('timestamp', 'desc')
				.onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
		}
	}, [id]);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	const createChat = () => {
		const roomName = prompt('Please enter name for chat');

		if (roomName) {
			db.collection(ROOMS).add({
				name: roomName
			});
		}
	};

	return !addNewChat ? (
		<Link to={`/Rooms/${id}`}>
			<div className='sidebarChat'>
				<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
				<div className='sidebarChat__info'>
					<h2>{name}</h2>
					<p>{messages[0]?.messages}</p>
				</div>
			</div>
		</Link>
	) : (
		<div onClick={createChat} className='sidebarChat'>
			<h2>Add new Chat</h2>
		</div>
	);
}

export default SidebarChat;
