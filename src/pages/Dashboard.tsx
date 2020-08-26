import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react'
import React from 'react'
import { useSelector } from 'react-redux';
import { logoutUser } from '../firebase/config';
import { useHistory } from 'react-router';

const Dashboard: React.FC = () => {

  const history = useHistory();
  const username = useSelector((state: any) => state.user.username)

  async function logout() {
    await logoutUser()
    history.push('/')
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Hello {username}</p>
        <IonButton onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;