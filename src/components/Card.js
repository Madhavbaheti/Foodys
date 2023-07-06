import React from 'react'

function Card(props) {
    let options = props.options;
    let priceoptions = Object.keys(options);

  return (
    <div><div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
    <img className="card-img-top" src={props.img} alt="Card image cap" style={{width: "18rem", height:"200px"}} />
    <div className="card-body">
      <h5 className="card-title">{props.foodName}</h5>
      
      <div className="container w-100">
        <select className="m-2 h-100  bg-success rounded">
          {Array.from(Array(6), (e, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            );
          })}
        </select>
        <select className="m-2 h-100 bg-success rounded">
          {priceoptions.map((data)=> {
          return (
          <option key={data} value={data}>{data}</option>)  
          })}

        </select>
        <div className="d-inline h-100 fs-5 ">Total Price</div>
      </div>
    </div>
  </div></div>
  )
}

export default Card