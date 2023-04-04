import React from "react"
import { price } from "../../dummydata"

const PriceCard = () => {
  return (
    <>
      {price.map((val) => (
        <div className='items shadow '>
          <h4>{val.name}</h4>
          <h1>
          {val.price}
            <span>جنيه</span>
          </h1>
          <p>{val.desc}</p>
          <button className='outline-btn'>ألتحق الآن </button>
        </div>
      ))}
    </>
  )
}

export default PriceCard;
