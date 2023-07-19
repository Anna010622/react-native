// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
	apiKey: 'AIzaSyDE9qH7IlBO35T8r4MsnJdKvY78zT5bfUg',
	authDomain: 'react-native-93bc1.firebaseapp.com',
	databaseURL:
		'https://react-native-93bc1-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'react-native-93bc1',
	storageBucket: 'react-native-93bc1.appspot.com',
	messagingSenderId: '968089526815',
	appId: '1:968089526815:web:1f6f337defb96687dc6b2a',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
