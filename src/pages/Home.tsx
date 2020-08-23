import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonText, IonItem, IonAvatar, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonIcon, IonInput } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
import {star} from 'ionicons/icons';

const arr = [
  {
    name: 'Finn',
    desc: 'Dev that aspire to TL'
  }, {
    name: 'Han',
    desc: 'Trust me, I am a programmer'
  }, {
    name: 'Rey',
    desc: 'I am done with it!'
  }
]
//Change theme color in './theme/variables.css';

const Home: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Tutorial</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton routerLink="/login" color="primary">Login</IonButton>
        <IonButton routerLink="/register" color="secondary">Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
