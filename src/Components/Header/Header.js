import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { authContext, FirebaseContext } from '../../store/firebaseContext';
import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function Header() {

  const { user } = useContext(authContext)
  const { firebase } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const location = useLocation();


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? `${user.displayName}` : <Link to={'/login'}>  Login</Link>} </span>
          
          &nbsp;
          &nbsp;
          &nbsp;
          {user && <span style={{ cursor: 'pointer' }} onClick={() => {
            
            try {
              const auth = getAuth(firebase)
              signOut(auth)
              navigate('/login')
            }
            catch(error){
              alert(error)
            }
        
          }}>logout</span>}
          &nbsp;
          &nbsp;
          &nbsp;
          {user && location.pathname !=='/mylist' && <span style={{ cursor: 'pointer' }} ><Link to={'mylist'}>myList</Link></span>}
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span><Link to={'create'}>SELL</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
