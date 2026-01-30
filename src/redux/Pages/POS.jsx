
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { logoutUser } from '../Slices/userSlice';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { addToCart, deleteProduct, updateQuantity } from '../Slices/posSlice';
import { confirmOrder } from '../Slices/orderSlice';
import { clearUserCart } from '../Slices/posSlice';
import { reduceStock } from '../Slices/itemSlice';
import Header from '../components/Header';


const POS = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [outOfStock, setOutofStock] = useState("");
    const [error, setError] = useState("");
    const [discount, setDiscount] = useState(0);
    const [tax, setTax] = useState(0);



    const { items } = useSelector((state) => state.items);
    const { currentUser } = useSelector((state) => state.users);
    const { cart } = useSelector((state) => state.pos);


    const myItems = items.filter(
        (item) => item.userId === currentUser.id
    );

    const filteredItems =
        search.trim() === ""
            ? []
            : myItems.filter(
                (item) =>
                    item.title?.toLowerCase().includes(search.toLowerCase())
            );

    const userCart = cart.filter(
        (item) => item.userId === currentUser.id
    );
    const handleLogout = () => {
        dispatch(logoutUser());

    };

    const handleAdd = (item) => {

        if (Number(item.stock) <= 0) {
            setTimeout(() => {
                setOutofStock("");
            }, 1000);
            setOutofStock(true);
            return;
        }

        dispatch(
            addToCart({
                userId: currentUser.id,
                item
            })
        );


    };


    const totalItemsPrice = userCart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const discountValue = Number(discount) || 0;
    const taxValue = Number(tax) || 0;

    const finalBill = totalItemsPrice - discountValue + taxValue;

    const handleDelete = (item) => {
        dispatch(
            deleteProduct({
                userId: currentUser.id,
                itemId: item.id
            })
        );

    };
    const handleConfirm = () => {
        const userItems = cart.filter(item => item.userId === currentUser.id);

        if (userItems.length === 0) return setError("Cart is empty!");
        if (userItems.some(item => item.quantity > item.stock)) {
            setTimeout(() => {
                setError("");
            }, 2000);
            setError("You cannot order more than available stock!");
            return;
        }
        if (userItems.some(item => item.quantity === 0)) {
            setTimeout(() => {
                setError("");
            }, 2000);
            setError("Quantity cannot be zero!");
            return;
        }
        dispatch(reduceStock(userItems));

        dispatch(confirmOrder({
            items: userItems,
            subtotal: totalItemsPrice,
            tax: taxValue,
            discount: discountValue,
            totalAmount: finalBill,
        }));

        dispatch(clearUserCart({ userId: currentUser.id }));


        setTimeout(() => {
            setConfirmed(false);
        }, 1000);

        setConfirmed("✅ Order placed successfully!");

    };


    return (
        <div>
            <>
                <Header currentUser={currentUser} onLogout={handleLogout}
                />
            </>
            <div className="btns" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <Button
                    text="Dashboard"
                    onClick={() => navigate('/dashboard')}
                />
                <Button
                    text="Orders History"
                    onClick={() => navigate('/orders-history')}
                />
            </div>

            <div className="pos-search" style={{ width: '100%', maxWidth: '1000px', margin: '20px auto' }}>
                <SearchBar
                    value={search}
                    onChange={(e) => setSearch(e.target.value)

                    }
                />
            </div>


            {search && (
                <div className="search-results-wrapper" style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '600px',
                    backgroundColor: '#fff',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    marginTop: '5px',
                    zIndex: 1000,
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden',
                    margin: '0 auto'

                }}>

                    {filteredItems.length > 0 ? (
                        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                                padding: '10px 15px',
                                backgroundColor: '#f8f9fa',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: '#6b7280',
                                borderBottom: '1px solid #eee'
                            }}>
                                <span>PRODUCT</span>
                                <span style={{ textAlign: 'center' }}>STOCK</span>
                                <span style={{ textAlign: 'center' }}>PRICE</span>
                                <span style={{ textAlign: 'center' }}>ACTION</span>
                            </div>

                            {filteredItems.map((item) => (
                                <div key={item.id} className="search-item-row" style={{
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                                    padding: '12px 15px',
                                    alignItems: 'center',
                                    borderBottom: '1px solid #f3f4f6',
                                    transition: 'background 0.2s',

                                }}>
                                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#111827' }}>
                                        {item.title}
                                    </div>

                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{
                                            color: item.stock < 10 ? '#ef4444' : '#10b981',
                                            fontWeight: 'bold',
                                            fontSize: '13px',
                                            backgroundColor: item.stock < 10 ? '#fee2e2' : '#dcfce7',
                                            padding: '2px 8px',
                                            borderRadius: '4px'
                                        }}>
                                            {item.stock}
                                        </span>
                                    </div>

                                    <div style={{ textAlign: 'center', fontWeight: '700', color: '#374151' }}>
                                        Rs {item.price}
                                    </div>

                                    <div style={{ textAlign: 'center' }}>
                                        <button
                                            onClick={() => handleAdd(item)}
                                            style={{
                        backgroundColor: "#eff6ff",
                        color: "#3b82f6",
                        border: "none",
                        width:'70px',
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                            🔍 No product found
                        </div>
                    )}
                </div>
            )}



            <div style={{ marginTop: "30px", width: '80%', marginLeft: 'auto', marginRight: 'auto', padding: '10px', borderRadius: '8px' }}>
                <h2 style={{ color: '#2c323b' }}>No of items Added ( {<span >
                    {
                        userCart.reduce((sum, i) => sum + i.quantity, 0)
                    } </span>})</h2>

                <div style={{ marginTop: '20px', width: '100%' }}>
                    <div style={{
                        backgroundColor: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #e5e7eb"
                    }}>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr 1.2fr 0.8fr",
                            backgroundColor: "#e2e9f0",
                            padding: "15px 20px",
                            borderBottom: "2px solid #f3f4f6",
                            color: "#4b5563",
                            fontWeight: "bold",
                            fontSize: "13px",
                            letterSpacing: "0.5px"
                        }}>
                            <span>PRODUCT</span>
                            <span style={{ textAlign: "center" }}>PRICE</span>
                            <span style={{ textAlign: "center" }}>QUANTITY</span>
                            <span style={{ textAlign: "right" }}>ACTION</span>
                        </div>

                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {userCart.length > 0 ? (
                                userCart.map((item) => (
                                    <div key={item.id} style={{
                                        display: "grid",
                                        gridTemplateColumns: "2fr 1fr 1.2fr 0.8fr",
                                        padding: "15px 20px",
                                        alignItems: "center",
                                        borderBottom: "1px solid #f3f4f6",
                                        transition: "background 0.2s"
                                    }} className="cart-row-hover">

                                        <span style={{ fontWeight: "600", color: "#111827", fontSize: "15px" }}>
                                            {item.title}
                                        </span>

                                        <span style={{ textAlign: "center", fontWeight: "500", color: "#374151" }}>
                                            Rs {item.price}
                                        </span>

                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                background: "#f3f4f6",
                                                borderRadius: "8px",
                                                padding: "5px"
                                            }}>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    disabled={confirmed}
                                                    onChange={(e) =>
                                                        dispatch(updateQuantity({
                                                            userId: currentUser.id,
                                                            itemId: item.id,
                                                            quantity: Number(e.target.value)
                                                        }))
                                                    }
                                                    style={{
                                                        width: "50px",
                                                        border: "none",
                                                        background: "transparent",
                                                        textAlign: "center",
                                                        fontWeight: "bold",
                                                        outline: "none",
                                                        fontSize: "14px",

                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ textAlign: "right" }}>
                                            <button
                                                type='button'
                                                onClick={() => handleDelete(item)}
                                                style={{
                                                    backgroundColor: "#fee2e2",
                                                    color: "#ef4444",
                                                    border: "none",
                                                    padding: "8px 12px",
                                                    borderRadius: "8px",
                                                    cursor: "pointer",
                                                    fontSize: "12px",
                                                    fontWeight: "600",
                                                    transition: "0.2s"
                                                }}
                                            >
                                                ✕ Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ padding: '40px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🛒</div>
                                    <p style={{ color: '#9ca3af', fontWeight: '500' }}>No Items Added yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>



            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                    marginRight: "10%",
                }}
            >
                <div
                    style={{
                        background: "#f9fafb",
                        border: "1px solid #e5e7eb",
                        borderRadius: "10px",
                        padding: "16px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                        width: "25%",

                        minHeight: "150px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    <h3
                        style={{
                            marginBottom: "12px",
                            borderBottom: "1px solid #e5e7eb",
                            paddingBottom: "8px",
                            textAlign: userCart.length === 0 ? "center" : "left"
                        }}
                    >
                        Bill Summary
                    </h3>

                    {userCart.length > 0 ? (
                        <>

                            <p
                                className='bill-summary'
                            >
                                <span> Sub Total:</span>
                                <span>Rs {totalItemsPrice.toFixed(2)}</span>

                            </p>
                            <p className='bill-summary'>
                                <span>Discount: </span>
                                <span style={{ float: 'right', }}> <input type="number" className='discount-input'
                                    min={0} value={discount}
                                    style={{ fontSize: '12px', fontWeight: 'bold', padding: '8px' }}
                                    onChange={(e) => {
                                        setDiscount(e.target.value);

                                    }}
                                />


                                </span>

                            </p>
                            <p className='bill-summary'>
                                <span>Tax: </span>
                                <span style={{ float: 'right' }}><input type='number' className='discount-input' min={0}
                                    name='tax'
                                    value={tax}
                                    style={{ fontSize: '12px', fontWeight: 'bold', padding: '8px' }}
                                    onChange={(e) => setTax(e.target.value)
                                    }
                                /></span>
                            </p>
                            <p className='bill-summary'>
                                Grand Total:
                                <span style={{ float: 'right' }}>
                                    {
                                        finalBill.toFixed(2)
                                    }

                                </span>
                            </p>


                            <div className="confirm-order" style={{ marginTop: '10px', width: '100%' }}>
                                <button onClick={handleConfirm} disabled={confirmed} className='Place-order-btn'>
                                    Place Order
                                </button>


                            </div>

                        </>
                    ) : (

                        <div style={{ textAlign: "center", color: "#141414", padding: "10px " }}>
                            <>

                                <p
                                    className='bill-summary'
                                >
                                    <span> Sub Total:</span>
                                    <span>0</span>

                                </p>
                                <p className='bill-summary'>
                                    <span>Discount: </span>
                                    <span style={{ float: 'right', }}> <input type="number" className='discount-input'
                                        min={0} value={discount}
                                        disabled
                                        style={{ fontSize: '12px', fontWeight: 'bold', padding: '8px' }}
                                        onChange={(e) => {
                                            setDiscount(e.target.value);

                                        }}
                                    />


                                    </span>

                                </p>
                                <p className='bill-summary'>
                                    <span>Tax: </span>
                                    <span style={{ float: 'right' }}><input type='number' className='discount-input' min={0}
                                        name='tax'
                                        value={tax}
                                        disabled
                                        style={{ fontSize: '12px', fontWeight: 'bold', padding: '8px' }}
                                        onChange={(e) => setTax(e.target.value)

                                        }
                                    /></span>
                                </p>
                                <p className='bill-summary'>
                                    Grand Total:
                                    <span style={{ float: 'right' }}>
                                        0

                                    </span>
                                </p>


                                <div className="confirm-order" style={{ marginTop: '10px', width: '100%' }}>
                                    <button onClick={handleConfirm}

                                        disabled

                                        className='Place-order-btn'>
                                        Place Order
                                    </button>


                                </div>

                            </>
                        </div>
                    )
                    }
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', fontSize: '18px' }}>
                
                {
                    outOfStock && <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>Item is out of stock!</p>
                }
               
 {confirmed && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="Success-icon" style={{display:'flex',justifyContent:'center'}} >
                <img src="https://static.vecteezy.com/system/resources/previews/033/294/021/large_2x/line-green-tick-mark-approved-check-mark-icon-symbols-symbol-for-website-computer-and-mobile-green-tick-verified-badge-icon-social-media-official-account-tick-symbol-vector.jpg" alt=""
                style={{width:'50px'}} />
            </div>
            <h1>Order place successfully</h1>

                     </div>
        </div>
      )}

       {error && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="Success-icon" style={{display:'flex',justifyContent:'center',fontSize:'30px'}} >
                <img src="https://static.vecteezy.com/system/resources/previews/009/881/778/original/cross-icon-illustration-free-vector.jpg" alt="" style={{width:'50px'}} />
            </div>
            <h1>{error}</h1>

                     </div>
        </div>
      )}

            </div>
        </div>
    );
};

export default POS;
