import {useEffect} from 'react';
import { db, auth, createTimestamp } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const useAuthUser = () => {
      const [user] = useAuthState(auth);

      useEffect(() => {
            if (user) {
                  const ref = db.collection('users').doc(user.uid);
                  ref.get().then(doc => {
                        if (!doc.exists) {
                              ref.set({
                                    name: user.displayName,
                                    photoURL: user.photoURL,
                                    timestamp: createTimestamp(),
                              });
                        }
                  });
            }
      }, [user]);

      return user;
};
export default useAuthUser;
