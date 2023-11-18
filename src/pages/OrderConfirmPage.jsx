import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const OrderConfirmPage = () => {

  const {state} = useLocation()


  return (
    <section className='confirm-page'>
        <div className="container">
            <div className="wrapper">
              <div className="confirm-content flexcol">
                <h2>Success!</h2>
                {/* <p>
                  Your invoice no. is <strong>{state}</strong>
                </p> */}
                <p>
                  Thanks for your submission, we will get back to you shortly within 24 hours! 
                </p>
                <div className="buttons flexitem">
                  <button className="primary-btn">
                    <Link to={`/category?featured=1&page=1`}>
                      Continue Shopping  
                    </Link>
                  </button>
                  <button className="secondary-btn">
                    <Link to={`/`}>
                      Return Home
                    </Link>
                  </button>
                </div>
              </div>
            </div>
        </div>
    </section>
  )
}

export default OrderConfirmPage