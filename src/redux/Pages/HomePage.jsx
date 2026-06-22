import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import Header from '../components/homePage/Header';



const HomePage = () => {


    const { items } = useSelector((state) => state.items);
    console.log(items);
    
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    return (
        <div className="wrapper">
            <Header  search={search} setSearch={setSearch} />
            <div
                id="carouselExampleIndicators"
                className="carousel slide container "
                data-bs-ride="carousel"
            >
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            className="d-block w-100"
                            src="https://img.lazcdn.com/us/domino/250f1397-2521-4ebf-983b-13811408db71_PK-1976-688.jpg_2200x2200q80.jpg_.avif"
                            alt="First slide"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className="d-block w-100"
                            src="https://img.lazcdn.com/us/domino/cc29858b-7e50-4880-bc10-191c91496ebd_PK-1976-688.jpg_2200x2200q80.jpg_.avif"
                            alt="Second slide"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className="d-block w-100"
                            src="https://img.lazcdn.com/us/domino/7d94d7c5-d0a7-4533-9ed3-b0d5c84a8640_PK-1976-688.jpg_2200x2200q80.jpg_.avif"
                            alt="Third slide"
                        />
                    </div>
                </div>

                <button
                    className="carousel-control-prev "
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"

                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
         
            <div className="container mt-5">
                <img src="https://img.lazcdn.com/us/domino/3b2d2589-63e1-4008-9743-172a85d25521_PK-1188-140.gif_2200x2200q80.gif_.webp" alt=""
                    className='img-fluid w-100' />
            </div>
          
            <div className="container mt-5">
                <span className=' just  ms-2'>Just For You</span>
            </div>
            <div className="row mt-3 container m-auto">

                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} className="col-md-2 mb-3 ">

                            <div className=" main-crd  shadow-sm border-0 " onClick={() => { navigate(`/product/${item.id}`) }}>
                                <img src="https://img.drz.lazcdn.com/static/pk/p/8b9a7d96ce1536bc2d17df838a0bce0a.jpg_400x400q80.jpg_.avif" alt=""
                                    className='img-fluid  item-img w-100 '
                                    style={{
                                        height: "200px",
                                        objectFit: "cover",
                                    }} />
                                <div className="p-2">
                                    <h5 className="card-title mt-2">{item.title.length > 15 ?
                                    item.title.slice(0,15).toUpperCase() + "..." : item.title.toUpperCase()}</h5>
                                    <p className="card-text price">Rs. {item.price}</p>
                                    <p className='seller mb-2'> Seller: {item.seller ? (item.seller.name || item.seller) : "unknown"}
                                    </p>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items in the cart</p>
                )}
            </div>

        </div>
    )
}

export default HomePage
