import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from './components/AuthUser';
import Guest from './navbar/Guest';
import Auth from './navbar/auth';


function App() {

  const { getToken } = AuthUser();
  if (!getToken()) {
    return <Guest />
  }
  return (
    <Auth />
  )
}

export default App;
