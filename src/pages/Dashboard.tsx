import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLoading, IonInput } from '@ionic/react'
import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { logoutUser } from '../firebase/config';
import { useHistory } from 'react-router'
import words from './../wordlist'
import './Dashboard.css';

const Dashboard: React.FC = () => {

  const history = useHistory();
  const username = useSelector((state: any) => state.user.username)
  const [busy, setBusy] = useState(false)
  const [input, _setInput] = useState('')
  const inputRef = useRef<HTMLIonInputElement>(null);

  async function logout() {
    setBusy(true)
    await logoutUser()
    history.replace('/')
    setBusy(false)
  }

  function setInput( value: string) {
    if(inputRef.current) {
      inputRef.current.value = value
    }
  }

  function setInputValue( value: string){
    if(value.trim() === '' ) {
      setInput('')
    } else if (value[value.length -1] === ' ') {
      setInput('')
    } else {
      setInput(value)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading message="Logging out.." duration={0} isOpen={busy} />
        {words.slice(0,10).map( word => (
          <span className="word" key={word}>{word}</span>
        ))}

        <IonInput placeholder="Write the word!" 
          ref={inputRef}
          onIonChange={ (e: any) => setInputValue(e.target.value) }
        />

        <p>Hello {username}</p>
        <IonButton onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;