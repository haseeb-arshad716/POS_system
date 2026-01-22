import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, editItem, deleteItem, clearProducts } from "../Slices/productSlice";
import { logoutUser } from "../Slices/userSlice";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector(state => state.products);



  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editSuccessfully, setEditSuccessfully] = useState(false);
  const [deleteSuccessfuly, setDeleteSuccessfully] = useState(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (!storedProducts) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  const handleEditClick = (item) => {
    setSelectedProduct({ ...item });
    setEditModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(editItem(selectedProduct));
    setEditModalOpen(false);
    setSelectedProduct(false);
    setEditSuccessfully(true);
    setTimeout(
      () => setEditSuccessfully(false), 1000,
    );

  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
    setDeleteSuccessfully(true);
    setTimeout(() => setDeleteSuccessfully(false), 1000);
  };

  const handlePopulate = () => {
    dispatch(clearProducts());
    dispatch(fetchProducts());
  };

  const handleLogout = () => {
    dispatch(logoutUser());

    localStorage.removeItem("currentUser");
    navigate('/');
  };

  if (status === "loading") return
  <p style={{
    padding: '20px', background: 'red', display: 'flex',
    justifyContent: 'center', justifyItems: 'center', alignItems: 'center'
  }}>Loading...</p>;

  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="products-page">
      <div className="products-header" style={{ marginTop: '10px' }}>
        <Button onClick={handlePopulate} text="Populate Data " />
        <Button onClick={handleLogout} text="Logout" />
      </div>

      <div className="products-grid">
        {items.map(item => (
          <div key={item.id} className="product-card">
            <img src={item.thumbnail} alt={item.title} style={{ objectFit: 'contain' }} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="price-btn">
              <p className="price">${item.price}</p>
            </div>
            <p className="rating">⭐ {item.rating}</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.availabilityStatus}</p>
            <div className="card-buttons">
              {<button className="edit-btn" onClick={() => handleEditClick(item)}>Edit</button>
              }
              <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editModalOpen && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Product</h3>
            <label htmlFor="">Title:
              <br />
            </label>
            <input name="title" value={selectedProduct.title} onChange={handleChange} placeholder="Title" />

            <label htmlFor="">Price:
              <br /></label>

            <input name="price" value={selectedProduct.price} onChange={handleChange} placeholder="Price" />

            <label htmlFor="">Rating:
              <br />
            </label>
            <input name="rating" value={selectedProduct.rating} onChange={handleChange} placeholder="Rating" />

            <div className="modal-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {editSuccessfully && (
        <div className="modal-overlay">
          <div className="modal-content success-modal">
            <h1>✅ Edit Successfully</h1>
          </div>
        </div>
      )}
      {
        deleteSuccessfuly &&
        <div className="modal-overlay">
          <div className="modal-content succesfully">
            <h1> ✅ Delete Successfully</h1>
          </div>
        </div>
      }
    </div>

  );
};

export default Products;
