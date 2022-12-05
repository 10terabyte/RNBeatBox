import React from 'react';
import auth from '@react-native-firebase/auth';


export function useAuthentication() {
  const [user, setUser] = React.useState(false);
  const [initializing, setInitializing] = useState(true);
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [auth]);
  return {
    user,
    setUser
  };
}