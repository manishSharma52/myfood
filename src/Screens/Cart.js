import React from "react";
import { useCart, useDispatchCart } from "../componants/ContextReducer";

function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart Is Empty</div>
      </div>
    )
  }


  const  handleCheckOut = async () => {
    let userEmail = localStorage.getItem('userEmail');
    let response = await fetch("http://localhost:5000/api/OrderData",{
    method: "POST",
    headers: { 
      "content-type": "application/json; charset=utf-8",
    },
    body:JSON.stringify({
      order_data : data,
      email: userEmail,
      order_date : new Date().toDateString()
    })
    }

    );
    if(response.status===200){
      dispatch({type: 'DROP'})
    }
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn p-8"
                      onClick={() => dispatch({ type: "REMOVE", index: index })}
                    >
                      <img
                        src="https://imgs.search.brave.com/sehhbGgnXzrrSiDkfPyccyGjv2iYPNIU1BKnb6EgP5M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzExLzM5LzUz/LzM2MF9GXzkxMTM5/NTMxOF8yaGM0WEJy/aEgxUXBLd1liczVN/SUkzZ2ZOZjJYSzlV/Ri5qcGc"
                        alt="delete"
                        style={{ height: "20px" }}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h1>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckOut }> Check Out </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
