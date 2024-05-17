import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC4lpv4MmQczbBFBDnogoS_zQynjNEoxr0',
  authDomain: 'pl4n3t-cf2cd.firebaseapp.com',
  projectId: 'pl4n3t-cf2cd',
  storageBucket: 'pl4n3t-cf2cd.appspot.com',
  messagingSenderId: '700751148116',
  appId: '1:700751148116:web:e21f5dc7a6983e0dd6e9c1',
  measurementId: 'G-JN8FKTNT41',
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
