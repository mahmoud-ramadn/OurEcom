import { Badge, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';
import Darkmod from '../Darkmod/Darkmod';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { authLogout } from '@store/auth/authSlice';
import HeaderLetBar from './HeaderLeftBar/HeaderLetBar';
import { actGetWishlist } from '@store/wishlist/wishlistSlice';
import { useEffect } from 'react';


const { headerContainer, headerLogo } = styles
interface HeaderProps {
  handl: () => void; // handl is a function that takes no arguments and returns void
}


const Header = ({ handl }: HeaderProps) => {

  const { accessToken, user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();


useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("ProductIds"));
    }
  }, [dispatch, accessToken]);

  return (<header>
    <div className={headerContainer}>
      <h1 className={headerLogo}>
        <span>our</span> <Badge bg="info">Ecom</Badge>
      </h1>
      <Darkmod handle={handl} />

      <HeaderLetBar />
    </div>


    <Navbar
      expand="lg"
      className='bg-body-tertiary'
      bg='dark'
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="categories">
              Categories
            </Nav.Link>
            <Nav.Link as={NavLink} to="about-us">
              About
            </Nav.Link>
          </Nav>



          {!accessToken ?
            <Nav>
              <Nav.Link as={NavLink} to="login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="register">
                Register
              </Nav.Link>
            </Nav> : (
              <Nav>
                <NavDropdown title={`${user?.firstName} ${user?.lastName}`} id="basic-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to={"profile"}  >Profile</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="profile/orders" >Order</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to='/' onClick={() => dispatch(authLogout())}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
  )
}

export default Header