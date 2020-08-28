import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLoading, IonInput } from '@ionic/react'
import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { logoutUser } from '../firebase/config';
import { useHistory } from 'react-router'
import words from './../wordlist'

import './Dashboard.css';

type WordType = {
  word: string
  done: boolean
  correct: boolean
}

const Dashboard: React.FC = () => {

  const history = useHistory();
  const username = useSelector((state: any) => state.user.username)
  const [busy, setBusy] = useState(false)
  const [input, _setInput] = useState('')
  
  const [activeWordList, setActiveWordList] = useState<WordType[]>(
    words.slice(0, 15).map( word => ({ word, done: false, correct: false })
    )
  )

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
        {activeWordList.map( item => {
            const isDonde = item.done
            const isCorrect = item.correct

            if( isDonde && isCorrect ){
              return (
                <span className="word done correct" key={item.word}>{item.word}</span>
              )
            } else if ( isDonde && !isCorrect) {
              return (
                <span className="word done" key={item.word}>{item.word}</span>
              )
            }
            return (
              <span className="word" key={item.word}>{item.word}</span>
            )
          }
        )}

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