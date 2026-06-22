import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCart } from '../Slices/Daraz_slices/cartSlice';
import Header from '../components/homePage/Header';

const ProductDetail = () => {
    const { items } = useSelector((state) => state.items);
    const [search, setSearch] = useState("");
    const { id } = useParams();
    const product = items.find((item) => String(item.id) === String(id));
    const [quantity, setQuantity] = useState(1);
    
    
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            selectedQuantity: quantity,
            vendorId: product.userId, 
            vendorName: product.seller
            
        }));
   
   
    };

    return (
        <div>
            <div className="wrapper bg-light">
                <Header search={search} setSearch={setSearch} />
                <div className="container bg-light  mt-4">
                    <div className="row bg-white">
                        <div className="col-3">
                            <img src="https://img.drz.lazcdn.com/static/pk/p/8b9a7d96ce1536bc2d17df838a0bce0a.jpg_400x400q80.jpg_.avif" alt=""
                                className='img-fluid p-2 rounded' />
                        </div>
                        <div className="col-6">
                            <div className="container my-5">

                                <div className="row g-3">
                                    <div className="col">
                                        <p className='product-title'>{product.title.toUpperCase()}</p>
                                        <p className='price'>Rs {product.price}</p>
                                        <p className='seller '> Seller: {product.seller ? (product.seller.name || product.seller) : "unknown"}</p>
                                        <p className='mb-5 qty '>Quantity : <input type="number" className='px-2 py-1 ' min={1} value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} /></p>
                                    </div>
                                </div>
                                <div className="col d-flex gap-3 pd-btn">
                                    <button className='btn buy w-50 p-3 ' style={{ backgroundColor: '#2abbe8', color: 'white' }}>Buy now </button>
                                    <button className='btn cart w-50 p-3' type='button' style={{ backgroundColor: '#f57224', color: 'white' }}
                                        onClick={() => { handleAddToCart() }}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 bg-light p-3 rounded shadow-sm border">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <small className="text-muted fw-bold">Delivery Options</small>
                                <i className="bi bi-info-circle"></i>
                            </div>
                            <div className="d-flex align-items-start mb-3">
                                <span className="me-2">📍</span>
                                <div className="small">
                                    <span className="d-block">Sindh, Karachi - Gulshan-e-Iqbal, Block 15</span>
                                    <Link href="#" className="text-primary text-decoration-none" style={{ fontSize: '11px' }}>CHANGE</Link>
                                </div>
                            </div>
                            <hr />

                            <div className="row align-items-center">
                                <div className="col-7">
                                    <div className="d-flex align-items-center">
                                        <span className="me-2">🚚</span>
                                        <div>
                                            <span className="d-block fw-bold" style={{ fontSize: '14px' }}>Standard Delivery</span>
                                            <small className="" style={{ fontSize: '12px' }}>Guranteed by 5 Feb</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-5 text-end">
                                    <span className="fw-bold text-dark">Rs. 150</span>
                                </div>
                            </div>

                            <div className="row align-items-center mt-3">
                                <div className="col-7">
                                    <div className="d-flex align-items-center">
                                        <span className="me-2">💸</span>
                                        <span style={{ fontSize: '14px' }}>Cash on Delivery Available</span>
                                    </div>
                                </div>
                                <div className="col-5 text-end" style={{ fontSize: '12px' }}>
                                    FREE
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
