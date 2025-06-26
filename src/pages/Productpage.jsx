import React, { useEffect, useState, useContext } from "react";
import "../assets/styles/Product.css";
import { IoIosAdd } from "react-icons/io";
import { MdShoppingCart } from "react-icons/md";
import { RiDeleteBin6Fill, RiSubtractFill } from "react-icons/ri";
import axios from "axios";
import { Cartcontext } from "../context/Cartcontext";
import { useNavigate } from "react-router-dom";

export default function Productpage() {
  const [Products, setProducts] = useState([]);
  const { addcart,increse, decrese } = useContext(Cartcontext);
  const navi =useNavigate()

  useEffect(() => {
    axios
      .get("/data/data.json")
      .then((res) => {
        // Ensure each product has a quantity of 1 and totalAmount precomputed
        const updatedProducts = res.data.map((item) => ({
          ...item,
          quantity: 1,
          totalAmount: item.price + item.tax,
        }));
        setProducts(updatedProducts);
      })
      .catch((err) => console.log(err.name));
  }, []);

  return (
    <div className="Products-Main">
      <h1 className="Products-page-heading">Products</h1>
      <div className="ProductsTabel-mainContainer">
        <div className="cart-items-container">
          <div className="table-responsive">
            <div className="cart-tabel">
              <table>
                <thead>
                  <tr>
                    <th>ITEM DETAILS</th>
                    <th>QUANTITY</th>
                    <th>TAX</th>
                    <th>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {Products.map((items) => (
                    <tr key={items.id}>
                      <td>{items.name}</td>
                      <td className="cart-quantity">
                      <RiSubtractFill role="button" onClick={() => decrese(items.id)} size={20} />
                        {items.quantity}
                        <IoIosAdd role="button" onClick={() => increse(items.id)} size={21} />
                      </td>
                      <td>₹{items.tax}</td>
                      <td>
                        ₹{items.price}{" "}
                        <MdShoppingCart
                          role="button"
                          onClick={() => addcart(items)}
                          className="add-cart-icon"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={()=>navi("/sidebar/home")} style={{backgroundColor:"#F88E55",color:"black"}} className="cart-button">Next</button>
        </div>
      </div>
    </div>
  );
}
