import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

function Home() {
  const [search,setsearch] = useState("");
  const [foodItem, setfoodItem] = useState([]);
  const [catData, setcatData] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();
    setfoodItem(response[0]);
    setcatData(response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel"  style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id="carousel">
            <div className='carousel-caption' style={{"zIndex": "2"}}>
            <form className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search}  onChange={(e)=> {setsearch(e.target.value)}} />
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </form>
            </div>

                    <div className="carousel-item active">
                        <img className="d-block w-100" src="https://source.unsplash.com/random/900*700/?burger" alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://source.unsplash.com/random/900*700/?pizza" alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://source.unsplash.com/random/900*700/?pasta" alt="Third slide"/>
                    </div>
                </div>
                <button className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </button>
                <button className="carousel-control-next" href="#carouselExampleFade" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </button>
            </div>
      </div>
      <div className="container m-3">
        {catData !== []
          ? catData.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id}>{data.CategoryName}</div>

                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter((item) => (item.CategoryName == data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map((filteritems) => {
                        return (
                          <div
                            key={filteritems._id}
                            className="col-12 col-md-6 col-lg-4 mb-5 "
                          >
                            <Card
                              foodName={filteritems.name}
                              options={filteritems.options[0]}
                              img={filteritems.img}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data Found</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
