
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




const POS = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [outOfStock, setOutofStock] = useState("");
    const [error, setError] = useState("");

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


    const handleAdd = (item) => {

        if (Number(item.stock) <= 0) {
            setTimeout(()=>{
                setOutofStock("");
            },2000);            setOutofStock(true);
            return;
        }

        dispatch(
            addToCart({
                userId: currentUser.id,
                item
            })
        );


    };
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

        if (userItems.length === 0) return alert("Cart is empty!");
        if (userItems.some(item => item.quantity > item.stock )) {
            setTimeout(()=>{
                setError("");
            },2000);
             setError("You cannot order more than available stock!");
            return;
        }
        if (userItems.some(item => item.quantity === 0 )) {
            setTimeout(()=>{
                setError("");
            },2000);
            setError("Quantity cannot be zero!");
            return;
        }
        const total = userItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        dispatch(reduceStock(userItems));

        dispatch(confirmOrder({
            items: userItems,
            totalAmount: total
        }));

        dispatch(clearUserCart({ userId: currentUser.id }));


        setTimeout(() => {
            setConfirmed(false);
        }, 2000);

        setConfirmed("✅ Order placed successfully!");

    };

    return (
        <div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <h1>My Store</h1>
                <h2>Admin: {currentUser.name}</h2>
                <div style={{ justifyContent: 'flex-end', display: 'flex', marginBottom: '10px' }}>
                    <Button text="Logout" onClick={() => dispatch(logoutUser())} />
                    <Button text="Back" onClick={() => navigate("/Dashboard")} />
                    <Button text="Orders History" onClick={() => navigate("/orders-history")} />

                </div>
            </div>

            <hr />

            <div className="pos-search">
                <SearchBar
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {search && (
                <table
                    border="1"
                    style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}
                >
                    <thead>
                        <tr>
                            <th style={{ padding: '10px' }}>ID</th>
                            <th style={{ padding: '10px' }}>Product</th>
                            <th style={{ padding: '10px' }}>Stock</th>
                            <th style={{ padding: '10px' }}>Price</th>
                            <th style={{ padding: '10px' }}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ padding: '10px' }}>{item.id}</td>
                                    <td style={{ padding: '10px' }}>{item.title}</td>
                                    <td style={{ padding: '10px' }}>{item.stock}</td>
                                    <td style={{ padding: '10px' }}>${item.price}</td>
                                    <td>
                                        <button style={{ margin: '10px' }}
                                            className="add-to-cart-pos"
                                            onClick={() => handleAdd(item)}
                                            
                                        >
                                            Add
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>
                                    No product found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}


            {userCart.length > 0 && (
                <div style={{ marginTop: "30px" }}>
                    <h2 >Your Added Items</h2>

                    <div style={{ display: "flex", gap: "20px", marginTop: '20px' }}>

                        <table
                            border="1"
                            style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ padding: '10px' }} >Product</th>
                                    <th style={{ padding: '10px' }}>Price</th>
                                    <th style={{ padding: '10px' }}>Qty</th>
                                    <th style={{ padding: '10px' }}>Total items</th>
                                    <th style={{ padding: '10px' }}>Total bill</th>
                                    <th style={{ padding: '10px' }}>Action</th>



                                </tr>
                            </thead>

                            <tbody>
                                {userCart.length > 0 && userCart.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{ padding: '10px' }}>{item.title}</td>
                                        <td style={{ padding: '10px' }}>${item.price}</td>
                                        <td style={{ padding: '10px' }}>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                disabled={confirmed}
                                                style={{
                                                    width: "60px",
                                                    padding: "5px",
                                                    textAlign: "center"
                                                }}
                                                onChange={(e) =>
                                                    dispatch(
                                                        updateQuantity({
                                                            userId: currentUser.id,
                                                            itemId: item.id,
                                                            quantity: Number(e.target.value)
                                                        })
                                                    )
                                                }
                                            />
                                        </td>

                                        <td style={{ padding: '10px' }}>{item.quantity}</td>
                                        <td style={{ padding: '10px' }}>${item.price * item.quantity}</td>
                                        <td style={{ padding: '10px' }}><button type='button' onClick={() => { handleDelete(item) }}>Delete</button></td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            )}

            {userCart.length > 0 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "20px"
                    }}
                >
                    <div
                        style={{
                            background: "#f9fafb",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            padding: "16px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                            width: "20%"
                        }}
                    >
                        <h3
                            style={{
                                marginBottom: "12px",
                                borderBottom: "1px solid #e5e7eb",
                                paddingBottom: "8px"
                            }}
                        >
                            Bill Summary
                        </h3>

                        <p>
                            <strong>Total Items:</strong>{" "}
                            {userCart.reduce((sum, i) => sum + i.quantity, 0)}
                        </p>

                        <p
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#047857"
                            }}
                        >
                            Total: $
                            {userCart.reduce(
                                (sum, i) => sum + i.price * i.quantity,
                                0
                            )}
                        </p>
                    </div>
                </div>
            )}
            <div className="confirm-order" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                {
                    userCart.length > 0 && <Button text="Place Order" onClick={handleConfirm} disabled={confirmed} />
                }
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', fontSize: '18px' }}>
                {
                    confirmed && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>{confirmed}</p>
                }
                {
                    outOfStock && <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>Item is out of stock!</p>
                }
                {
                    error && <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>{error}</p>
                }
            </div>

        </div>
    );
};

export default POS;
