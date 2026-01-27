import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../Slices/itemSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { addStock } from '../Slices/itemSlice';

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
      <h1 className='dashboard-header'>Welcome to {currentUser?.name.toUpperCase()}</h1>

      <div className="btns" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => setModalOpen(true)} text="Add Item" />

        <Button onClick={handleLogOut} text="Logout" />

        <Button text="POS" onClick={goToPos} />
      </div>

      <div className="summary">
        <span>Total Items
          <p style={{ marginTop: '20px' }}> {myItems.length}</p>
        </span>
        <span>
          Total Stock
          <p style={{ marginTop: '20px' }}> {
            myItems.reduce((sum, i) => sum + Number(i.stock), 0)
          }</p>
        </span>
      </div>

      <div className="dashboard-table-container">
        <h2 style={{ marginTop: '20px' }}>Your Added Items</h2>



        <table border="1" style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#e4d0d0ff', textAlign: 'left', color: 'black' }}>

              <th style={{ padding: '10px' }}>Title</th>
              <th style={{ padding: '10px' }}>Price</th>
              <th style={{ padding: '10px' }}>Stock</th>
              <th style={{ padding: '10px' }}>Description</th>
              <th style={{ padding: '10px' }}>Action</th>

            </tr>
          </thead>

          <tbody>
            {myItems.length > 0 ? (
              myItems.map((item) => (
                <tr key={item.id || item.title + Date.now()}>
                  <td style={{ padding: '10px' }}>{item.title}</td>
                  <td style={{ padding: '10px' }}>${item.price}</td>
                  <td style={{ padding: '10px' }}>{item.stock}</td>
                  <td style={{ padding: '10px' }}>{item.description}</td>
                  <td style={{ padding: '10px' }}><button type='button'
                    style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
                    onClick={() => handleDelete(item.id)}>
                    Delete</button>
                    <button type='button' onClick={() => openModal(item)}>
                      Add Stock
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No items found. Click "Add to item" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
                <button type='submit'>Update Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}

export default Dashboard;