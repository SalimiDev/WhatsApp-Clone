import styles from './App.module.css';
import { auth } from './firebase';
//hooks
import useWindowSize from './hooks/useWindowSize';
import useAuthUser from './hooks/useAuthUser';
//Components
import Login from './components/Login';
import Sidebar from './components/Sidebar';

function App() {
      const user = useAuthUser(auth);
      const page = useWindowSize();

      if (!user) {
            return <Login />;
      }
      return (
            <div className={styles.App} style={{ ...page }}>
                  <div className={styles.app__body}>
                        <Sidebar user={user} page={page} />
                  </div>
            </div>
      );
}

export default App;
