import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyCfAwwN6jYsEK-FtmUXjUacw2hwaopdH1Q',
	authDomain: 'whatsapp-817b8.firebaseapp.com',
	projectId: 'whatsapp-817b8',
	storageBucket: 'whatsapp-817b8.appspot.com',
	messagingSenderId: '879685127315',
	appId: '1:879685127315:web:13f4d56bffd95a638bd166',
	measurementId: 'G-2TQ1E2YD27'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
