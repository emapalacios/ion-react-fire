import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/react'
import React, { useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { loginUser } from '../firebase/config'
import { toast } from '../toast'

const Login: React.FC = () => {
  
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function login() {
    const res = await loginUser(username, password)
    if (res) {
      toast('Login ok')
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
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