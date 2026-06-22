import React from 'react';

const Hero = () => {
  return (
    <div className="container-fluid col-xxl-8 px-4 py-5 hero mt-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        
        <div className="col-12 col-sm-8 col-lg-6">
          <img
            src="https://th.bing.com/th/id/R.d221e5bf118cbac750101b7a7724738d?rik=YBLRW9sVxyDGYw&pid=ImgRaw&r=0"
            className="d-block mx-lg-auto img-fluid rounded-3 shadow-lg"
            alt="Hero Header"
            loading="lazy"
            width="1500"
            height="500"
          />
        </div>

        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3">
            Running 
            <br />
             <span className='hero-text'>shoes</span>
          </h1>
          <p className="lead">
           Running shoes typically feature cushioning in the forefoot and heel to absorb impact, which helps protect the joints during runs. This cushioning varies in thickness and material, affecting the shoe's overall feel and performance.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" className="btn get-start btn-lg px-4 me-md-2 " style={{backgroundColor:'#ffc107'}}>
              Get Started
            </button>
            <button type="button" className="btn  btn-lg px-4">
              Learn More
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;