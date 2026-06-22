import React from "react";
import Header from "../components/homePage/Header";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <p>Please login to see your orders.</p>
        </div>
      </>
    );
  }

  const myOrders = orders.filter((order) => order.userId === user.id);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="container mt-5">
          <h3 className="mb-4">My Orders</h3>

          <div className="row fw-bold p-3 bg-light border-bottom d-none d-md-flex text-center">
            <div className="col">Order ID</div>
            <div className="col">Product Name</div>
            <div className="col">Quantity</div>
            <div className="col">Date</div>
            <div className="col">Status</div>
            <div className="col">Total Amount</div>
          </div>

          {myOrders.length === 0 ? (
            <div className="text-center mt-5">
              <p className="lead text-muted">No orders found</p>
            </div>
          ) : (
            myOrders.map((order) => (
              <div key={order.id} className="border-bottom py-3 align-items-center">
                {order.items.map((item, index) => (
                  <div className="row text-center align-items-center mb-2" key={item.id}>

                    <div className="col ">
                      {index === 0 ? `#${order.id}` : ""}
                    </div>

                    <div className="col ">
                      {item.title}
                    </div>
                    <div className="col">
                      {item.quantity}
                    </div>

                    <div className="col ">
                      {order.date}
                    </div>

                    <div className="col">
                      {index === 0 && (
                        <span
                          className={`badge px-3 py-2  fs-7 ${order.status === "Pending"
                            ? "bg-warning text-dark"
                            : order.status === "Cancelled"
                              ? "bg-danger text-white"
                              : order.status === "confirmed"
                                ? "bg-success text-white"
                                : "bg-secondary text-white"

                            }`}
                        >
                          {order.status}

                        </span>
                      )}

                    </div>

                    <div className="col fw-bold" style={{ color: "#f85606" }}>
                      {index === 0 ? `Rs. ${order.totalAmount}` : ""}
                    </div>

                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
