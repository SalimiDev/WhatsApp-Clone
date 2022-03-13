import React ,{useEffect} from 'react';
import styles from './App.module.css';
import { auth } from './firebase';
import { Route, Routes,  useNavigate } from 'react-router-dom';
//hooks
import useWindowSize from './hooks/useWindowSize';
import useAuthUser from './hooks/useAuthUser';
//Components
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
const App=()=> {
      const user = useAuthUser(auth);
      const page = useWindowSize();
      const navigate = useNavigate();
      useEffect(() => {
            if (page.isMobile) {
                  navigate('/chats');
            } else {
                  navigate('/');
            }
      }, [page.isMobile]);

      if (!user) {
            return <Login />;
      }

      return (
            <div className={styles.App} style={{ ...page }}>
                  <div className={styles.app__body}>
                        <Sidebar user={user} page={page} />
                        <Routes>
                              <Route path='/room/:roomId' element={<Chat user={user} page={page} />} />
                        </Routes>
                  </div>
            </div>
      );
}

export default App;
