import React, { Fragment } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useState } from 'react';
import { useContext } from 'react';
import { authContext, FirebaseContext } from '../../store/firebaseContext';
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom'


const Create = () => {
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] =useState('') 
  const [image,setImage] = useState(null)
  const {firebase} =useContext(FirebaseContext)
  const {user} =useContext(authContext)
  const storage = getStorage()
  const db = getFirestore();
  const date=new Date()
  const navigate = useNavigate()

  const handleSubmit=async ()=>{
    if(!image)return
    const storageRef = ref(storage, `images/${image.name}`)
    const collectionRef = collection(db, 'products');
    try {
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      console.log(url)
      try {
        const newDocRef = await addDoc(collectionRef, {
          name,
          category,
          price,
          url,
          userID:user.uid,
          createdDate:date.toString()
        });
        console.log('Document written with ID:', newDocRef.id);
        navigate('/')
      } catch (error) {
        console.error('Error adding document:', error);
      }
    } 
    catch (error) {
      console.error('Upload error:', error);
      alert('Image upload failed!');
    } finally {
      setImage(null); // Clear selected image after upload
    }


  }

    return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
      
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              value={name}
              onChange={e=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              value={category}
              onChange={e=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price} onChange={e=>setPrice(e.target.value)} />
            <br />
  
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""} ></img>
   
            <br />
            <input type="file" onChange={e=>{
              setImage(e.target.files[0])
            }}/>
            <br />
            <button className="uploadBtn" onClick={handleSubmit} type='submit'>upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
