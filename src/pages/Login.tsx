import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonLoading } from '@ionic/react'
import React, { useState } from 'react'
import './Home.css'
import { Link, useHistory } from 'react-router-dom'
import { loginUser } from '../firebase/config'
import { toast } from '../toast'
import { useDispatch } from 'react-redux'
import { setUserState } from '../redux/actions'

const Login: React.FC = () => {
  
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [busy, setBusy] = useState<boolean>(false)

  async function login() {
    setBusy(true)
    const res = await loginUser(username, password)
    if (res) {
      dispatch(setUserState(res.user?.email))
      history.push('/dashboard')
    }
    setBusy(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {busy && 
          <IonLoading 
            message="Please wait..."
            duration={0}
            isOpen={busy}
          />
        }
        <IonInput
          placeholder="Email"
          value={username}
          onIonChange={(e: any) => setUsername(e.target.value)}
        >
        </IonInput>
        <IonInput
          type="password"
          placeholder="Password"
          value={password}
          onIonChange={(e: any) => setPassword(e.target.value)}
        >
        </IonInput>
        <IonButton onClick={login}>Ingresar</IonButton>
        <p>¿No tienes cuenta? <Link to="/register">Registrarse</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Login;