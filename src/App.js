
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { useEffect,useContext } from 'react';
import { authContext, FirebaseContext } from './store/firebaseContext';
import { onAuthStateChanged, getAuth} from 'firebase/auth';
import Create from './Pages/Create'
import Viewpost from './Pages/ViewPost'
import Post from './store/postContext'
import Mylists from './Pages/Mylist';

function App() {
  const {setUser} =useContext(authContext)
  const {firebase} =useContext(FirebaseContext)
  const auth = getAuth(firebase);


  useEffect(()=>{

       onAuthStateChanged(auth,(user)=>{
        setUser(user)
    })
  },
  [])
  

  return (
    <div>
      <Post>

      <Router>
        <Routes>
          <Route exact element={<Home/>} path='/'/>
          <Route element={<Signup/>} path='signup'/>
          <Route element={<Login/>} path='login'/>
          <Route element={<Create/>} path='create'/>
          <Route element={<Viewpost/>} path='viewpost'/>
          <Route element={<Mylists/>} path='mylist' />
        </Routes>
        
       
      </Router>
      </Post>
    </div>
  );
}

export default App;
