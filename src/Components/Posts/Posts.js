import React, { useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import FirebaseContext from '../../store/firebaseContext'
import { useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import {postContext} from '../../store/postContext'

function Posts() {
  const [post, setPost] = useState([])
  const db = getFirestore();
  const collectionRef = collection(db, 'products');
  const navigate = useNavigate()
  const {setpostDetail} =useContext(postContext)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef);
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPost(fetchedData);
        console.log(post)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // return()=>{
    //   setPost([])
    // }
  },
    [])

    // storing postdata in context-
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
           post.map((product,index)=>{
            return(
          
              
              <div
              className="card"
              style={{backgroundColor:'white'}}
              onClick={()=>{
                setpostDetail(product)
                navigate('/viewpost')
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name" style={{textTransform:'capitalize'}}><h2>{product.name}</h2></p>
              </div>
              <div className="date">
                <span>Tue May 04 2021</span>
              </div>
            </div>
            
            )

           })
               
              
            
          }
           

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
