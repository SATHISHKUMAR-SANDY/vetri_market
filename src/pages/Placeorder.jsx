import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/images/completed.png";
import "../assets/styles/Place.css";
function Placeorder() {
  const [a_customer,setcustomer] = useState({})
  
  const navi = useNavigate()
  
    useEffect(()=>{

const saved =JSON.parse(localStorage.getItem("customer"))
if(saved){
    setcustomer(saved)
}
    },[])
  
    return (

    <>
      <div className="order-success-container">
        <img src={logo2} alt="Order Completed" className="order-image" />
        <h2 className="order-title">Your Order Completed</h2>
        <p className="order-subtitle">
          Thank you. Your order has been received
        </p>

        <div className="order-table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email I’d</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{a_customer.id}</td>
                <td>{a_customer.name}</td>
                <td>{a_customer.ph}</td>
                <td>{a_customer.email}</td>
                <td>
                  <button className="download-btn" onClick={()=>navi("/invoice")}>Download Invoice</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
    //   <>
    //   <div className="order-parent">

    //   <div className="img-container">
    // <img src={logo2}></img>
    //   </div>
    //   <div className="ordermessage">
    // <h1>Your Order Completed</h1>
    // <p>Thank you.Your Order has been recevied</p>
    //   </div>
    //   <div className="about-order">
    // <table className="custom-table">

    // <thead>
    //     <tr>
    //     <th>Order ID</th>
    //     <th>Name</th>
    //     <th>Phone Number</th>
    //     <th>Email I'd</th>
    //     <th></th>

    //     </tr>
    // </thead>
    // <tbody>
    //     <tr>
    //         <td>
    //             1234
    //         </td>
    //         <td>sathishKumar</td>
    //         <td>9025927391</td>
    //         <td>sathish@gmail.com</td>
    //     </tr>
    // </tbody>

    // </table>

    //   </div>
    //   </div>

    //   </>
  );
}

export default Placeorder;
