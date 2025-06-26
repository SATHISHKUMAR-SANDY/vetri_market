import React from "react";
import tnx from "../assets/images/thx.png";
import "../assets/styles/Invoice.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Endpage() {
  const navi = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => {
      navi("/customerdetail"); // redirect to home after 5 seconds
    }, 2000);

    return () => clearTimeout(timer); // cleanup if component unmounts early
  },[]);
  return (
    <>
      <div className="thank-container">
        <img src={tnx}></img>

        <h1>Thank You For Shopping</h1>
      </div>
    </>
  );
}
