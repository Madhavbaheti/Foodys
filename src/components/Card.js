import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";


function Card(props) {
  let options = props.options;
  let data = useCart();
  let priceoptions = Object.keys(options);
  let dispatch = useDispatchCart();
  let priceRef = useRef();
  useEffect  ( () => {
    setsize(priceRef.current.value);
  },[])
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");
  let finalPrice = qty * parseInt(options[size]);
  const handleAddtoCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        return

      }
  return
    }
    
    await dispatch({
      type: "ADD",
      name: props.foodItems.name,
      id: props.foodItems._id,
      qty: qty,
      size: size,
      price: finalPrice,
    });
    console.log(data);
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "370px" }}>
        <img
          className="card-img-top"
          src={props.foodItems.img}
          alt="Card image cap"
          style={{ objectFit: "fill", height: "200px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              
              
              ref={priceRef}
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setsize(e.target.value)}
            >
              {priceoptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>

            <div className="d-inline h-100 fs-5 mr-4">${finalPrice}/-</div>
            <hr></hr>
            <button
              className="btn  bg-success text-green  mx-2"
              style={{ fontWeight: "600" }}
              onClick={handleAddtoCart}
            >
              Add To Cart
             
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
