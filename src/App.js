import './App.css';
import { auth } from './firebase';
import useAuthUser from './hooks/useAuthUser';
//Components
import Login from './components/Login';

function App() {
      const user = useAuthUser(auth);
      if (!user) {
            return <Login />;
      }
      return <div className='App'>
                         App
                  </div>;
}

export default App;
