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
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  
  const [activeWordList, setActiveWordList] = useState<WordType[]>(
    words.slice(0, 10).map( word => ({ word, done: false, correct: false })
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
      setActiveWordList(list => {
        const wordBlocks = [...list]
        wordBlocks[activeWordIndex] = {
          ...wordBlocks[activeWordIndex],
          done: true,
          correct: wordBlocks[activeWordIndex].word === value.trim()
        }
        setActiveWordIndex(count => ++count)
        wordBlocks.push({word: words[wordBlocks.length], correct: false, done: false})
        return wordBlocks
      })
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
        {activeWordList.map( wordBlock => {
            const isDonde = wordBlock.done
            const isCorrect = wordBlock.correct

            if( isDonde && isCorrect ){
              return (
                <span className="word done correct" key={wordBlock.word}>{wordBlock.word}</span>
              )
            } else if ( isDonde && !isCorrect) {
              return (
                <span className="word done incorrect" key={wordBlock.word}>{wordBlock.word}</span>
              )
            }
            return (
              <span className="word" key={wordBlock.word}>{wordBlock.word}</span>
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