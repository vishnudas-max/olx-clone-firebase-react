import React from 'react';
import { useEffect, useState, useContext } from 'react';
import './View.css';
import { postContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/firebaseContext';
import { getDoc, getFirestore, doc } from 'firebase/firestore';

function View() {
  const [userdetailes, setUserdetailes] = useState()
  const { postdetail } = useContext(postContext)
  const {firebase} = useContext(FirebaseContext)
  const db = getFirestore(firebase);


  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      try {
        const userRef = doc(db, 'users', postdetail.userID);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists) {
          setUserdetailes(docSnap.data())
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData()



  }, [db, postdetail.userID]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postdetail ? postdetail.url : ''}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postdetail.price} </p>
          <span> {postdetail.name}</span>
          <p>{postdetail.category}</p>
          <span>{postdetail.createdDate}</span>
        </div>
        {userdetailes && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userdetailes.username}</p>
            <p>{userdetailes.phoneNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
