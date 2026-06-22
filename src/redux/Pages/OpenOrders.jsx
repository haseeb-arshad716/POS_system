import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus } from '../Slices/Daraz_slices/darazOrderSlice';
const OpenOrders = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const { orders } = useSelector((state) => state.orders);

  const filteredOrders = orders.filter(order =>
    order.items.some(item => Number(item.vendorId) === Number(currentUser?.id))
  );
  const dispatch = useDispatch();

  const handleApproved = (orderId) => {
    dispatch(updateOrderStatus({
      orderId,
      status: "confirmed"
    }));

  }
  const handleRejected = (orderId) => {
    dispatch(updateOrderStatus({
      orderId,
      status: "Cancelled"
    }))
  }
  return (
    <>
      <div className="wrapper">
        <div className="container p-2  bg-white  rounded">
          <div className="row mb-4">
            <div className="col-12 h4 fw-bold text-dark">
              Welcome to {currentUser?.name}
            </div>
          </div>

          <div className="row fw-bold p-3 bg-light border-bottom d-none d-md-flex text-center">
            <div className="col">Order ID</div>
            <div className="col">Customer Name</div>
            <div className="col">Product</div>
            <div className="col">Quantity</div>
            <div className="col">Status</div>
            <div className="col">Total Amount</div>
          </div>

          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="border-bottom py-2">
                {order.items
                  .filter(item => Number(item.vendorId) === Number(currentUser?.id))
                  .map((item, index) => (
                    <div className="row text-center align-items-center py-2" key={item.id}>
                      <div className="col ">
                        {index === 0 ? `#${order.id}` : ""}
                      </div>

                      <div className="col fw-semibold">
                        {index === 0 ? (order.customerName || "Guest User") : ""}
                      </div>

                      <div className="col text-capitalize">
                        {item.title}
                      </div>

                      <div className="col">
                        {item.quantity}
                      </div>

                      <div className="col d-flex justify-content-center  ">

                        {index === 0 && (order.status === "Pending"  ? (
                            <div > <button
                            type="button"
                            className="btn btn-sm text-white bg-primary me-2 "
                            onClick={() => handleApproved(order.id)}
                          >
                            Approve
                          </button><button
                            type="button"
                            className="btn bg-danger text-white btn-sm"
                            onClick={() => handleRejected(order.id)}
                          >
                              Reject
                            </button></div>
                          
                        ) : (
                          <span
                            className={`badge px-3 py-2  ${order.status === "Cancelled"
                                ? "bg-danger text-white"
                                : order.status === "confirmed"
                                  ? "bg-success text-white"
                                  : "bg-secondary text-white"
                              }`}
                          >
                            {order.status}
                          </span>
                       ) )}

                      </div>

                      <div className="col fw-bold" style={{ color: "#f85606" }}>
                     
                      Rs. {item.totalPrice}

                      </div>
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <div className="text-center p-5">
              <h5 className="text-muted">No orders </h5>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default OpenOrders
