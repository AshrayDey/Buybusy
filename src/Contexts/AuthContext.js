import React from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseinnit';

const AuthContext = React.createContext();

export const useAuth = () => {
  const value = React.useContext(AuthContext);
  return value;
};
export const AuthContextProvider = ({ children }) => {
  const [authStore, setAuthStore] = React.useState({
    userList: [],
    loggedIn: false,
    currentUser: undefined,
    updateAuthStore: () => void 0
  });

  const updateAuthStore = React.useCallback(
    data => {
      setAuthStore(prev => {
        return {
          ...prev,
          ...data
        };
      });
    },
    [setAuthStore]
  );

  React.useEffect(() => {
    onSnapshot(collection(db, 'Users'), snapshot => {
      const users = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      setAuthStore({
        userList: users
      });
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authStore,
        updateAuthStore
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
