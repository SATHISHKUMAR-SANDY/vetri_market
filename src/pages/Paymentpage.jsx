import React from "react";
import "../assets/styles/payment.css";
import { RiDraftLine } from "react-icons/ri";
import { useState } from "react";
import cash from "../assets/images/cash.png";
import card from "../assets/images/card.png";
import { MdOutlineDone } from "react-icons/md";
import { useContext } from "react";
import { Cartcontext } from "../context/Cartcontext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Paymentpage() {
const navi =   useNavigate()
  const [time, settime] = useState(new Date()); 
const{ cartitems} =  useContext(Cartcontext)
  const [payment, setpayment] = useState({
    card: "card",
    cash: "cash",
  });
const [total,settotal] = useState({
  t_tax:0,
  sub_t:0,
  total:0
})
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // set to false for 24-hour format
  });

  const labell = "Received Payment";
  const valuee = "150.00";
  useEffect(() => {
    const handeltotal = () => {
      if (cartitems) {
        let tax = 0;
        let price = 0;
        let totalAmount = 0;
  
        cartitems.forEach((item) => {
          tax += item.tax || 0;
          price += item.price || 0;
          totalAmount += item.totalAmount || 0;
        });
  
        settotal({
          t_tax: tax,
          sub_t: price,
          total: totalAmount,
        });
      }
    };
  
    handeltotal();
  }, [cartitems]); // add dependency to re-run when cartitems change
  
  return (
    <>
      <div className="payment-main-container">
        <div className="payment-form-container">
          <div className="date-draft-container">
            <div className="date-time">
              <p>
                Date : <strong>12/07/2024</strong>
              </p>
              <p>
                Time : <strong>{formattedTime}</strong>
              </p>
              <p>
                BillNo : <strong>2133432</strong>
              </p>
            </div>

            <div className="deraft">
              <button>
                {" "}
                <RiDraftLine></RiDraftLine>draft
              </button>
            </div>
          </div>

          <div className="collect-amount-container">
            <p className="collectAmount">
              CollectAmount<br></br>
              <span className="ms-5">{total.sub_t}</span>
            </p>
            <p className="BlanceAmount">
              Balance<br></br>
              <span className="ms-2">0</span>
            </p>
          </div>

          <div className="cashoption-container">
            <div className="type-paymets">
              <div className="cash-payment">
                <img src={cash}></img>
                <button>
                  Cash <MdOutlineDone className="done" color="red" />
                </button>
              </div>

              <div className="card-payment">
                <img src={card}></img>
                <button>Card </button>
              </div>
            </div>

            <div className="recevied-amount">
              <div className="floating-input filled">
                <input type="text" value={valuee} readOnly />
                <label>{labell}</label>
              </div>
            </div>
          </div>

          <div className="total-container">
            <hr className="first-line"></hr>
            <div>
              <div className="sub-total">
                <p>Sub Total</p>
                <p>{total.sub_t}</p>
              </div>

              <div className="tax">
                <p>Tax</p>
                <p>{total.t_tax}</p>
              </div>

              <div className="round">
                <p>Round off</p>
                <p>00</p>
              </div>
            </div>
            <hr></hr>

            <div className="total">
            <p>Total</p>
            <p>{total.total}</p>

            </div>

          <div className="save-payment">
          <button>Save</button>
          <button onClick={()=>navi("/order")}>Payment</button>

          </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Paymentpage;
