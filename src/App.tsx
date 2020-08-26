import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { getCurrentUser } from './firebase/config'
import { logoWindows } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/actions';

const RoutingSystem: React.FC = () => {
  return(
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

const App: React.FC = () => { 

  const [busy, setBusy] = useState<boolean>(false)
  const dispatch = useDispatch()
  useEffect( ()=> {
    getCurrentUser().then( (user: any) => {
      if( user ) {
        dispatch(setUserState(user.email))
        window.history.replaceState({}, '', '/dashboard')
      } else {
        window.history.replaceState({}, '', '/')
      }
      setBusy(false)
    })
  }, [])

  return (
    <IonApp>{busy ? <IonSpinner /> : <RoutingSystem /> }    </IonApp>
  )
}

export default App;
