import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Slices/Daraz_slices/authSlice";
import { clearCart } from "../../Slices/Daraz_slices/cartSlice";
const Header = ({ search, setSearch }) => {
  
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

const navigate = useNavigate();
  
  const handleLogout= ()=>{
    dispatch(logout());
    dispatch(clearCart());
    
  }
  return (
    <header
      className="border-bottom home-header  shadow-sm"
      style={{ position: "sticky", top: "0", zIndex: "1030" }}
    >
      <div className="container-fluid px-4 mb-3 ">

        <div className="row justify-content-end mb-1  container-fluid">
          <div className="col-auto d-flex gap-3 align-items-center ">
            {!isLoggedIn ? (
              <>
                <Link to="/" className="text-white text-decoration-none small">
                  CUSTOMER CARE
                </Link>
                <Link to="/login-daraz" className="text-white text-decoration-none small">
                  LOGIN
                </Link>
                <Link to="/signup-daraz" className="text-white text-decoration-none small">
                  SIGN UP
                </Link>
              </>
            ) : (
              <div className="">      
                <div className="dropdown">
  <button
    className="btn p-0 border-0 bg-transparent dropdown-toggle d-flex align-items-center gap-2 "
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <div className="badge bg-light text-dark px-2 py-1 rounded  ">
      {user.name[0].toUpperCase()}
    </div>
    <span className="text-white">Welcome {user.name}</span>
  </button>

  <ul className="dropdown-menu dropdown-menu-end shadow px-2   py-2">
    <li>
      <button className="dropdown-item">
        My Profile
      </button>
    </li>
    <li>
      
      <Link className="dropdown-item" to="/my-orders">
        My Orders
      </Link>
    </li>
    <li><hr className="dropdown-divider" /></li>
    <li>
      <button
      
        className="dropdown-item text-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
    </li>
  </ul>
</div>
              </div>

            )}
          </div>
        </div>

        <div className="row align-items-center py-2 container m-auto">
          <div className="col-md-3 col-6">
            <img
              src="https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png"
              alt="Logo"
              className="img-fluid"
              style={{ objectFit: "contain", height: "40px"}}
              onClick={()=>{navigate('/homepage')}}
            />
          </div>

          <div className="col-md-8 col-12 order-3 order-md-2 mt-3 mt-md-0 d-flex">

            <div className="input-group">
              <input
                type="text"
                className="form-control home-search border-0 py-2 px-3 bg-light"
                placeholder="Search in Daraz"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn "
                type="button"
                style={{ backgroundColor: "#FFE1D2" }}
              >
                <img
                  src="https://www.svgrepo.com/show/522266/search.svg"
                  alt="search"
                  style={{ width: "15px" }}
                />
              </button>
            </div>

            <button
              className="btn position-relative p-2 border-0 bg-transparent"
              onClick={() => navigate("/checkout")}
            >
              <img
                src="/images/cart.svg"
                alt="Cart"
                className="ms-2"
                style={{ width: "35px" }}
              />
              {totalQuantity > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-dark">
                  {totalQuantity}
                </span>
              )}
            </button>
          {/* {
            isLoggedIn ? 
              <button className="btn btn-light ms-5 p-0 px-4 " onClick={handleLogout}>
              Logout
            </button> :
            ""
          } */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
