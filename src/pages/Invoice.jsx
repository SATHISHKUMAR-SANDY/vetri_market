import React, { useRef, useEffect, useState, useContext } from "react";
import html2pdf from "html2pdf.js";
import "../assets/styles/Invoice.css";
import { Cartcontext } from "../context/Cartcontext";
import { useNavigate } from "react-router-dom";

export default function Invoice() {
  const [a_customer, setcustomer] = useState({});
  const { cartitems } = useContext(Cartcontext);
 const navi = useNavigate()

  const invoiceRef = useRef();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("customer"));
    if (saved) {
      setcustomer(saved);
    }
  }, []);

  const downloadPDF = () => {
    const element = invoiceRef.current;
    const options = {
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
    navi("/thank")
  };

  return (
    <>
      <div className="invoice-parent" ref={invoiceRef}>
        <h1 className="head-invoioce">Tax Invoice</h1>
        <div className="main-invoice">
          <div className="about-company">
            <div className="about-company-content">
              <div>
                <p style={{ color: "orange" }}>
                  <strong>Sold By:</strong> Vetri Market
                </p>
                <p>
                  <strong>Ship-From Address:</strong> Vetri Market
                  <br />
                  65, Old Market, Sivagurunathapuram, Surandai,
                  <br />
                  Tamil Nadu 627-859
                </p>
              </div>
              <div className="invoice-number">Invoice Number #Hs465474</div>
            </div>
          </div>
          <hr className="invoice-line" />

          <div className="about-customer">
            <div className="id-date">
              <p>
                <strong>Order ID:</strong> {a_customer.id}
              </p>
              <p>
                <strong>Order Date :</strong> {a_customer.date}
              </p>
            </div>
            <p className="bill-address">
              <strong>Billing Address</strong>
              <br />
              {a_customer.name}
              <br />
              {a_customer.Address}
            </p>
          </div>

          <table className="custom-tabel-invoice">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {cartitems && cartitems.length > 0 ? (
                cartitems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.totalAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No Items Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <h2 className="total-amount-invoice">
            Total{" "}
            <span>
              ₹
              {cartitems && cartitems.length > 0
                ? cartitems.reduce((acc, item) => acc + (item.totalAmount || 0), 0)
                : 0}
            </span>
          </h2>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="download-btn invoice-btn" onClick={downloadPDF}>
          Download Invoice
        </button>
      </div>
    </>
  );
}
