import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>

      {user ? (
        // if user is logged in 
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li>
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
            <li><Link to='/message'>Messages</Link></li>
          </ul>
        </nav>
      ): (
        // user is NOT logged in
        <nav>
          <ul>
            <li><Link to='/signin'>Sign In</Link></li>
            <li><Link to='/signup'>Sign Up</Link></li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;
