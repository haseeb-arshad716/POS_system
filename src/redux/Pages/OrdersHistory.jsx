import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import { useState } from 'react';
const OrdersHistory = () => {

    const { history } = useSelector((state) => state.orders);
    const { currentUser } = useSelector((state) => state.users);

    const myOrders = history.filter(order =>
        order.items.some(item => item.userId === currentUser.id)
    );
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/POS');
    }
    const [receiptModal, setreceiptModal] = useState(false);

    return (

        <div style={{ padding: '20px' }}>
            <div className='header' style={{ display: 'flex', justifyContent: 'space-between',backgroundColor:'white',
                 alignItems: 'center', marginBottom: '20px',padding:'10px',borderRadius:'10px' }}>
                <h1 style={{ }}>Orders History</h1>
                <Button text="Back" onClick={() => { goBack() }} />
            </div>
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
            gridTemplateColumns: "1fr 1.5fr 1fr 0.8fr 0.8fr 1.2fr 1fr", 
            backgroundColor: "#f9fafb",
            padding: "15px 20px",
            borderBottom: "2px solid #f3f4f6",
            color: "#64748b",
            fontWeight: "bold",
            fontSize: "12px",
            letterSpacing: "0.5px"
        }}>
            <span>ORDER ID</span>
            <span>PRODUCTS</span>
            <span>GRAND TOTAL</span>
            <span>DISCOUNT</span>
            <span>TAX</span>
            <span>DATE & TIME</span>
            <span style={{ textAlign: "right" }}>ACTION</span>
        </div>

        <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
            {myOrders.length > 0 ? (
                myOrders.map((order) => (
                    <div key={order.orderId} style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.5fr 1fr 0.8fr 0.8fr 1.2fr 1fr",
                        padding: "15px 20px",
                        alignItems: "center",
                        borderBottom: "1px solid #f3f4f6",
                        transition: "background 0.2s"
                    }} className="history-row-hover">
                        
                        <span style={{ fontWeight: "700", color: "#3b82f6", fontSize: "14px" }}>
                            #{order.orderId}
                        </span>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {order.items.map((item, index) => (
                                <span key={index} style={{ 
                                    fontSize: "13px", 
                                    color: "#1f2937", 
                                    fontWeight: "500" 
                                }}>

                                    • {item.title}  
                                     <br />
                                     ( <span >

                                    Quantity :  {item.quantity  }</span> )
                                </span>
                            ))}
                        </div>

                        <span style={{ fontWeight: "700", color: "#111827" }}>
                            Rs {order.totalAmount.toFixed(2)}
                        </span>
 
                        <span style={{ color: "#ef4444", fontWeight: "600", fontSize: "13px" }}>
                            {order.discount > 0 ? `-Rs ${order.discount}` : "Rs 0"}
                        </span>

                        <span style={{ color: "#6b7280", fontSize: "13px" }}>
                            {order.discount > 0 ? `Rs ${order.tax}` : "Rs 0"}
                        </span>

                        <span style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.2" }}>
                            {order.date}
                        </span>

                        <div style={{ textAlign: "right" }}>
                            <button 
                                onClick={() => { setreceiptModal(true) }}
                                style={{
                                    backgroundColor: "#f3f4f6",
                                    color: "#374151",
                                    border: "1px solid #d1d5db",
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "5px"
                                }}
                            >
                                 Print
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div style={{ padding: '60px', textAlign: 'center' }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>📄</div>
                    <p style={{ color: '#9ca3af', fontWeight: '500' }}>No record found.</p>
                </div>
            )}
        </div>
    </div>
</div>
            

        </div>
    );
};

export default OrdersHistory;