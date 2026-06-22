import React, { useState } from 'react';
import Header from '../components/homePage/Header';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeItem,clearCart } from '../Slices/Daraz_slices/cartSlice';
import { placeOrder } from '../Slices/Daraz_slices/darazOrderSlice';
import { useNavigate } from 'react-router-dom';


const CheckOut = () => {
  const { isLoggedIn,user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [orderPlaced, setOrderPlaced]= useState("");
  const { cartItems } = useSelector((state) => state.cart);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.totalPrice), 0);
  const deliveryFee = cartItems.length > 0 ? 0 : 0;

 const handleProceed = () => {
  if (!isLoggedIn || !user) {
    navigate("/login-daraz", { state: { from: "/checkout" } });
    return;
  }

  
  const shortId = Math.floor(1000 + Math.random() * 90000);
  const order = {
    id: `ORD-${shortId}`,
    userId:Number(user.id),
    items: cartItems,
    totalAmount: subtotal,
    status: "Pending" ,  
    date: new Date().toLocaleString(),
    customerName: user.name,
  };
  dispatch(placeOrder(order));

  dispatch(clearCart());

  setOrderPlaced(true);
};


  return (
    <div className='bg-light min-vh-100'>
      <Header search={search} setSearch={setSearch} />

      <div className="container py-5">
        <h2 className="mb-4">Checkout</h2>
        <div className="row">

          <div className="col-lg-8">
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2">Items in Cart ({cartItems.length})</h5>

                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div className="row align-items-center py-3 border-bottom" key={item.id}>

                      <div className="col-2">
                        <img
                          src="https://img.drz.lazcdn.com/static/pk/p/8b9a7d96ce1536bc2d17df838a0bce0a.jpg_400x400q80.jpg_.avif" // Yahan item.image use karein agar available hai
                          alt={item.title}
                          className="img-fluid rounded"
                        />
                      </div>

                      <div className="col-3">
                        <h6 className="mb-0 text-capitalize">{item.title}</h6>
                        <small className="text-muted">Unit Price: Rs. {item.price}</small>
                      </div>

                      <div className="col-3 d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => dispatch(updateQuantity({ id: item.id, change: -1 }))}
                        >-</button>
                        <span className="mx-3 fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => dispatch(updateQuantity({ id: item.id, change: 1 }))}
                        >+</button>
                      </div>

                      <div className="col-2">
                        <span className="fw-bold text-dark">Rs. {item.totalPrice}</span>
                      </div>

                      <div className="col-2 text-end">

                        <button type='button' className='btn btn-danger ' onClick={() => dispatch(removeItem(item.id))}>Delete</button>

                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5">
                    <h5>Your cart is empty!</h5>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Fee</span>
                  <span>Rs. {deliveryFee}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold fs-5" style={{ color: '#f85606' }}>
                    Rs. {subtotal + deliveryFee}
                  </span>
                </div>
                <button
                  className="btn w-100  py-3" onClick={() => {
                    handleProceed()
                  }}
                  disabled={cartItems.length === 0}
                  style={{ backgroundColor: '#f85606', color: '#fff', border: 'none' }}
                >
                {
                  isLoggedIn ? <span>Proceed to checkout</span>
                  : <span>Place Order </span>
                }
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    {orderPlaced && (
  <div className="modal-overlay ">
    <div className="modal-content text-center bg-white rounded-3">
      
      <div className="success-icon mb-3">
        <img
          src="https://static.vecteezy.com/system/resources/previews/033/294/021/large_2x/line-green-tick-mark-approved-check-mark-icon-symbols-symbol-for-website-computer-and-mobile-green-tick-verified-badge-icon-social-media-official-account-tick-symbol-vector.jpg"
          alt="Success"
        />
      </div>

      <h4 className="fw-bold mb-2">
        Order Placed Successfully!
      </h4>
      <p className="text-muted mb-4">
        Thank you for shopping 
      </p>

      <button
        className="btn px-4 text-white"
        style={{ backgroundColor: "#f85606" }}
        onClick={() => navigate("/homepage")}
      >
        Continue Shopping
      </button>

    </div>
  </div>
)}

    </div>
  );
}

export default CheckOut;