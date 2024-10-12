import React, { useState, useEffect } from "react";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import Card from "../componants/Card";
// import Crousel from "../componants/Crousel";
// import { Link } from 'react-router-dom'

function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/FoodData", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCat(response[1]);
    console.log(response[0], response[1]);
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
        {/* <Crousel /> */}
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center ">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {setSearch(e.target.value)}}
                />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://imgs.search.brave.com/nR4J_Tu6zVS9fw9b9BfG0j3i5Zqr8Aw10iWM1679yBM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ0/Njk5NjAzMC9waG90/by9jbG9zZS11cC1v/Zi1idXJnZXJzLW9u/LXRhYmxlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1lSWtP/c0ladU1TWEl4elJX/Rmg5VVJJR2twWk56/S0dHcjIxS0VxM3pT/MGNrPQ"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://imgs.search.brave.com/CDeFBdzd27p6OQGb4MXLp_tF0zaAi6z6xWeMIsP56iM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzgxLzg4LzEx/LzM2MF9GXzU4MTg4/MTE4MF9vWmN6RnZL/VmJFYUM4QXhMRGJ4/dU81ek0ycDJ6dGl3/Ny5qcGc"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://imgs.search.brave.com/7ZGRE37Eo_LodCVvReck7lP6_JTaPOLXc1xQmc16fVk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbnNh/bmVseWdvb2RyZWNp/cGVzLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8xMi9D/aGlja3BlYS1TYW5k/d2ljaC04MDB4NTMw/LmpwZw"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container ">
        {foodCat != []
          ? foodCat.map((data, index) => {
              return( <div key={index} className="row mb-3">
                  <div key={index} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem != [] ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filteritem) => {
                        return (
                          <div
                            key={filteritem.id}
                            className="col-12 col-md-6 col-xl-3"
                          >
                            <Card foodItem= {filteritem}
                              options={filteritem.options[0]}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No Such Data Found</div>
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
