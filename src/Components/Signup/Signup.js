import React from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { useState,useContext } from 'react';
import { FirebaseContext } from '../../store/firebaseContext';
import { createUserWithEmailAndPassword ,getAuth, updateProfile} from 'firebase/auth';
import { collection,getFirestore } from 'firebase/firestore';
import { setDoc,doc } from 'firebase/firestore';
import { useNavigate,Link } from 'react-router-dom';


export default function Signup() {
  const navigate = useNavigate();

  // creating state to store form data-
  const [userName,setUserName] =useState('')
  const [email,setMail] =useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] =useState('')

  const {firebase} =useContext(FirebaseContext)

  const handleSubmmit=async (e) =>{
    e.preventDefault()

    try {
     
      const auth = getAuth(firebase); // Get the authentication instance
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user=userCredential?.user
      const uid = userCredential.user.uid;
     
      const usersCollectionRef = collection(getFirestore(firebase), 'users');
    

      await setDoc(doc(usersCollectionRef, userCredential.user.uid), {
        uid: uid, // Add generated or provided UUID
        email: email,
        phoneNumber: phone,
        username: userName || '', // Include username if provided, otherwise set to empty string
        // Add other relevant user data fields here
      });
      await updateProfile(user, {
        displayName:userName
      })
      .then(()=>{

        navigate('/login')
      })
  

      
    } catch (error) {
      alert(error)
    }
  }


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={userName}
            onChange={e=>setUserName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={e=>setMail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
            onChange={e=>setPhone(e.target.value)}
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
          <button>Signup</button>
        </form>
        <Link to={'/login'} style={{textDecoration:'none',color:'black'}}>signup</Link>
      </div>
    </div>
  );
}
