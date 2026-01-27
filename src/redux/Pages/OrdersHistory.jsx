import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
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

    return (

        <div style={{ padding: '20px' }}>
            <div className='header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ marginBottom: '20px' }}>Orders History</h1>
                <Button text="Back" onClick={() => { goBack() }} />
            </div>
            {myOrders.length > 0 ? (
                <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f2f2f2' }}>
                        <tr>
                            <th>Order ID</th>
                            <th>Items</th>
                            <th>Total Price</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myOrders.map((order) => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>

                                    {order.items.map((item, index) => (
                                        <div key={index}>
                                            {item.title}
                                            <div>
                                                Quantity: {item.quantity}
                                            </div>
                                        </div>


                                    ))}
                                </td>
                                <td>${order.totalAmount}</td>
                                <td>{order.date}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>No record found.</p>
                </div>
            )}

        </div>
    );
};

export default OrdersHistory;