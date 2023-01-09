import React, { useState } from 'react'

const Slideshow = (props) => {
    const { slides } = props;
    console.log(slides);
    // setCount(count => count + 1);
    // let count = 0;
  return (
        <div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
            <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                {
                    slides.map(slide => (
                        <button
                            key={slide.id}
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to={slide.id - 1}
                            className={slide.id === 1 ? "active" : ""}
                            aria-current={slide.id === 1 ? "true" : "false"}
                            aria-label={`Slide ${slide.id}`}
                        ></button>
                    ))
                }
                {/* <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button> */}
            </div>
            <div className="carousel-inner relative w-full overflow-hidden">
                 {
                    slides.map(slide => (
                        <div key={slide.id} className={`carousel-item relative float-left w-full ${slide.id === 1 ? "active" : ""}`}>
                            <div className="relative overflow-hidden bg-no-repeat bg-cover" style={{backgroundPosition: "50%"}}>
                                <img src={slide.image} className="block w-full h-screen"/>
                                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-50"></div>
                            </div>
                            <div className="carousel-caption hidden md:block absolute text-center">
                                <h5 className="text-xl">{slide.title}</h5>
                                <p>{slide.text}</p>
                            </div>
                        </div>
                    ))
                 }
                
                {/* Section 2
                <div className="carousel-item relative float-left w-full">
                    <div className="relative overflow-hidden bg-no-repeat bg-cover" style={{backgroundPosition: "50%"}}>
                        <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(124).jpg" className="block w-full" />
                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-50"></div>
                    </div>
                    <div className="carousel-caption hidden md:block absolute text-center">
                        <h5 className="text-xl">Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                </div>
                <div className="carousel-item relative float-left w-full">
                    <div className="relative overflow-hidden bg-no-repeat bg-cover" style={{backgroundPosition: "50%"}}>
                        <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(125).jpg" className="block w-full" />
                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-50"></div>
                    </div>
                    <div className="carousel-caption hidden md:block absolute text-center">
                        <h5 className="text-xl">Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                </div> */}
            </div>
            <button
                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
  )
}

export default Slideshow