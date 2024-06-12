import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const navigate = useNavigate();
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }
  return (
    <nav className="nav-header">
        <Link to="/">
          <img
            className="website-logo"
            src="https://img.freepik.com/free-photo/history-icon-front-side-white-background_187299-40163.jpg?t=st=1718125122~exp=1718128722~hmac=0dbb80798ba3c18291c4838b50025a30c961d06f25b5a0300ceb072a9a7973e0&w=826"
            alt="website logo"
          />
        </Link>
        <button
          type="button"
          className="logout-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
    </nav>
  )
};
export default Header;