import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom'
import { registerUser } from '../firebase/config'
import { toast } from '../toast'

const Login: React.FC = () => {
  
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cpassword, setCPassword] = useState<string>('')

  async function register() {
    if( password !== cpassword ){
      return toast('Passwordsdo not match')
    }
    if( username.trim() === '' || password.trim() === ''){
      return toast('Email and password are required')
    }

    const res = await registerUser(username, password)
    if(res) {
      toast('You have registered successfully')
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrarse</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          placeholder="Username"
          value={username}
          onIonChange={(e: any) => setUsername(e.target.value)}
        />
        <IonInput
          type="password"
          placeholder="Password"
          value={password}
          onIonChange={(e: any) => setPassword(e.target.value)}
        />
        <IonInput
          type="password"
          placeholder="Confirm Password"
          value={cpassword}
          onIonChange={(e: any) => setCPassword(e.target.value)}
        />
        <IonButton onClick={register}>Registrarse</IonButton>
        <p>¿Ya tienes cuenta? <Link to="/login">Ingresar</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Login;