import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../Slices/itemSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { addStock } from '../Slices/itemSlice';
import Header from '../components/Header';
import { logoutUser } from '../Slices/userSlice';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("")
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [stockModalOpen, setstockModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.items);
  const { currentUser } = useSelector((state) => state.users);
  const myItems = items ? items.filter(item => item.userId === currentUser?.id) : [];

  const handleCancel = () => {
    setModalOpen(false);
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    if (!title || !price || !description || !stock) {
      setTimeout(() => {
        setError("");
      }, 2000);
      setError("Please filled all input fields");
      return
    }

    const newItem = {
      id: Date.now(),
      title,
      description,
      price: Number(price),
      stock: Number(stock),
      userId: currentUser.id
    };
    dispatch(addItem(newItem));

    setTitle("");
    setDescription("");
    setStock("");
    setPrice("");
    setModalOpen(false);
  };

  const handleLogOut = () => {

    navigate('/');
    localStorage.removeItem("currentUser");

  }
  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  }
  const goToPos = () => {
    navigate('/POS');
  }
const handleLogout = () => {
            dispatch(logoutUser()); 
        
    };
  const openModal = (item) => {
    setstockModalOpen(true);
    setSelectedItemId(item.id);
  };

  const handleConfirmUpdate = (e) => {
    e.preventDefault();

    dispatch(addStock({
      itemId: selectedItemId,
      addedStock: Number(stock)
    }));

    setstockModalOpen(false);
    setStock("");
  };

  return (
    <div className='dashboard-content'>

      <Header currentUser={currentUser} onLogout={handleLogOut}/>
      <div className="btns" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <Button onClick={() => setModalOpen(true)} text="Add Item" />

        <Button text="POS" onClick={goToPos}  />
      </div>

    <div className="state-card" style={{display:'flex',gap:'10px',marginTop:'10px'}} >
 <StatCard label="Products" 
                value={myItems.length} 
                icon="📦" 
                bgColor="#eff6ff"/>
 <StatCard label="Total Stock Items" 
              value={myItems.reduce((sum, item) => sum + item.stock, 0)}
                icon="✅" 
                bgColor="#eff6ff"/>

    </div>

      <div style={{ marginTop: '20px', width: '100%' }}>
        <div style={{
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #e5e7eb"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 2fr 1.5fr", 
            backgroundColor: "#f8fafc",
            padding: "15px 20px",
            borderBottom: "2px solid #f1f5f9",
            color: "#64748b",
            fontWeight: "700",
            fontSize: "12px",
            letterSpacing: "0.5px"
          }}>
            <span>PRODUCT TITLE</span>
            <span>PRICE</span>
            <span>STOCK</span>
            <span>DESCRIPTION</span>
            <span style={{ textAlign: "right" }}>ACTIONS</span>
          </div>

          
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {myItems.length > 0 ? (
              myItems.map((item) => (
                <div key={item.id || item.title} style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 1fr 2fr 1.5fr",
                  padding: "16px 20px",
                  alignItems: "center",
                  borderBottom: "1px solid #f1f5f9",
                  transition: "background 0.2s"
                }} className="inventory-row">
                    <span style={{ fontWeight: "600", color: "#1e293b" }}>{item.title}</span>
                  <span style={{ fontWeight: "500", color: "#334155" }}>Rs {item.price}</span>

                  <div>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "700",
                      backgroundColor: item.stock < 10 ? "#fee2e2" : "#dcfce7",
                      color: item.stock < 10 ? "#ef4444" : "#10b981"
                    }}>
                      {item.stock} in stock
                    </span>
                  </div>

                  <span style={{
                    fontSize: "15px",
                    color: "#48505b",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingRight: "10px"
                  }}>
                    {item.description || "No description"}
                  </span>

                  <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                    <button
                      onClick={() => openModal(item)}
                      style={{
                        backgroundColor: "#eff6ff",
                        color: "#3b82f6",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      Add Stock
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        backgroundColor: "#fff1f2",
                        color: "#e11d48",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '50px', textAlign: 'center', color: '#94a3b8' }}>
                <div style={{ fontSize: '30px' }}>📦</div>
                <p>No items found. Click "Add to item" to create one.</p>
              </div>
            )}
          </div>
        </div>
      </div>


      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>Add item</h1>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                type="text" placeholder='title'
                value={title} onChange={(e) => setTitle(e.target.value)}
              />

              <label>Description</label>
              <input
                type="text" placeholder='description'
                value={description} onChange={(e) => setDescription(e.target.value)}
              />

              <label>Price</label>
              <input
                type="text" placeholder='price'
                value={price} onChange={(e) => setPrice(e.target.value)}
              />

              <label>Stock</label>
              <input
                type="text" placeholder='stock'
                value={stock} onChange={(e) => setStock(e.target.value)}
              />
              <ErrorMessage message={error} />


              <div className="buttons">
                <button type='button' onClick={handleCancel}>Cancel</button>
                <button type='submit'>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}


      {stockModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>Update Stock</h1>

            <form onSubmit={handleConfirmUpdate}>
              <label htmlFor="" style={{ marginBottom: '5px' }}>Add Quantity</label>
              <input
                placeholder='Enter quantity'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />

              <div className="buttons">
                <button type='button' onClick={() => setstockModalOpen(false)}>Cancel</button>
                <button type='submit' style={{ backgroundColor: '#3b82f6' }}>Update Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}

export default Dashboard;