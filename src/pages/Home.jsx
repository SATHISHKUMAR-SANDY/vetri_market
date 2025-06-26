import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Home.css";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill, RiSubtractFill } from "react-icons/ri";
import { FaMicrophone, FaBarcode } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { Cartcontext } from "../context/Cartcontext";
import Editdata from "./Editdata";

function Home() {
  const [customerD, setcustomerD] = useState({});
  const [edit, setedit] = useState(false);
  const [relode, setrelode] = useState(false);
  const [model, setmodel] = useState(true);

  const { cartitems, increse, decrese } = useContext(Cartcontext);
  const navi = useNavigate();

  const closemodel = () => setmodel(false);
  const reload = () => setrelode((pre) => !pre);
  const openedit = () => setedit(true);
  const closedit = () => setedit(false);


// ... existing states
const [searchTerm, setSearchTerm] = useState("");

// ... existing context and functions

// Filtered products based on searchTerm
const filteredProducts = cartitems.filter((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);


  const handelDelete = () => {
    localStorage.removeItem("customer");
    setcustomerD({
      name: "",
      email: "",
      Address: "",
      date: "",
      ph: "",
    });
    setmodel(true);
    navi("/customerdetail");
  };

  useEffect(() => {
    const saved = localStorage.getItem("customer");
    if (saved) setcustomerD(JSON.parse(saved));
  }, [model, relode]);

  return (
    <div className="main-content">
      <h1>Customer Detail <span>Page</span></h1>

      <div className="C-detail-main">
        <div className="d-first-row">
          <p><strong>Customer Name:</strong><br /> {customerD.name}</p>
          <p><strong>Contact Number:</strong><br /> {customerD.ph}</p>
          <MdEdit role="button" onClick={openedit} size={30} className="Edit-icon" />
        </div>
        <hr />
        <div className="d-second-row">
          <div>
            <p><strong>Customer Address:</strong><br />
              {customerD.Address?.split("\n").map((line, i) => (
                <React.Fragment key={i}>{line}<br /></React.Fragment>
              ))}
            </p>
          </div>
          <div className="d-second-row-seecond-colum">
            <p><strong>Date:</strong><br /> {customerD.date}</p>
          </div>
          <RiDeleteBin6Fill role="button" onClick={handelDelete} size={30} className="Edit-icon" />
        </div>
      </div>

      {edit && <Editdata onclose={closedit} onUpdate={reload} />}

      {/* Products Table with Cart Items */}
      <div className="Products-main">
        <div className="searchbox-MainContainer">
          <div className="search-box-row">
            <CiSearch className="search-icon" />
            <input
              type="text"
              className="Search-Box"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaBarcode className="barcode-icon" />
            <FaMicrophone className="mic-icon" />
          </div>
          <div className="button-container">
            <button onClick={()=>navi("/sidebar/product")} ><IoIosAdd className="Add-icon" />Add Item</button>
          </div>
        </div>

        <div className="cart-items-container">
          <div className="table-responsive">
            <div className="cart-tabel">
              <table>
                <thead>
                  <tr>
                    <th>ITEM DETAILS</th>
                    <th>QUANTITY</th>
                    <th>Rate</th>
                    <th>TAX</th>
                    <th>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? filteredProducts.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td className="cart-quantity">
                        <RiSubtractFill role="button" onClick={() => decrese(item.id)} size={20} />
                        {item.quantity}
                        <IoIosAdd role="button" onClick={() => increse(item.id)} size={21} />
                      </td>
                      <td>₹{item.price}</td>
                      <td>₹{item.tax}</td>
                      <td>₹{item.totalAmount}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>No products found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={()=>navi("/sidebar/payment")} className="cart-button">Next</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
