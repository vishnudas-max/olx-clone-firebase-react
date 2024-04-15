import React, { useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { useState } from 'react';
import { FirebaseContext } from '../../store/firebaseContext';
import {Link,useNavigate} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const navigage=useNavigate()
  const {firebase} =useContext(FirebaseContext)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleLogin=async (e)=>{
    e.preventDefault()

      const auth=getAuth(firebase)
      const userCredential = await signInWithEmailAndPassword(auth,email,password)
      .then(()=>{
        navigage('/')
      })
      .catch((error)=>{
        alert('Password or Email does not match!')
      })
      
    }

  

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to={'/signup'} style={{textDecoration:'none',color:'black'}}>signup</Link>
      </div>
    </div>
  );
}

export default Login;
