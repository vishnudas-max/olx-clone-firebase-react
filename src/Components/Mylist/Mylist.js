import React, { useContext, useEffect, useState } from 'react'
import './Mylist.css'
import { authContext } from '../../store/firebaseContext'
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

function Mylist() {
    const { user } = useContext(authContext)
    const [userProducts, setUserproducts] = useState()
    const db = getFirestore()
    useEffect(() => {

        const q = query(collection(db, "products"), where("userID", "==", user.uid));
        const userProudctsfunction = async () => {
            const querySnapshot = await getDocs(q);
            const products = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data() // Spread the rest of the document data
            }));
            console.log(products)
            setUserproducts(products);
        }
        userProudctsfunction()
    },
        [])
    return (
        <div className='container'>
            <h1 >My post</h1>
            <div className='lists'>
                { userProducts &&
                    userProducts.map((val, ind) => {
                        return (
                            <div className="card">
                                <div className="image">
                                    <img src={val.url} alt="" />
                                </div>
                                <div className='detail'>
                                    <div>
                                        <h3>{val.category}</h3>
                                        <h2>{val.name}</h2>
                                    </div>
                                    <h2 className='price'>{val.price}</h2>
                                </div>
                            </div>
                        )
                    })

                }
                
            </div>

        </div>
    )
}

export default Mylist