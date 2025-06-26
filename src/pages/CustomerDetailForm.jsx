// pages/CustomerDetailForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/Customerdetail.css";

function CustomerDetailForm() {
  const generate7DigitId = () => Math.floor(1000000 + Math.random() * 9000000);
   const navi  = useNavigate()
  const [userinfo, SetuserInfo] = useState({
    id: generate7DigitId(),
    name: "",
    email: "",
    ph: "",
    date: "",
    Address: ""
  });

  const handelUser = (e) => {
    const { name, value } = e.target;
    SetuserInfo((current) => ({ ...current, [name]: value }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("customer", JSON.stringify(userinfo));
    alert("Customer details saved!");
    navi("/sidebar")
  
  };

  return (
    <form onSubmit={handelSubmit} className="row g-3 Formcontainer">
      {/* Form fields */}
      <h1 className='text-center text '>Customer Detail Form</h1>
      <div className="col-md-6">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" name="name" value={userinfo.name} onChange={handelUser} />
      </div>
      <div className="col-md-6">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" name="email" value={userinfo.email} onChange={handelUser} />
      </div>
      <div className="col-md-6">
        <label className="form-label">Phone</label>
        <input type="text" className="form-control" name="ph" value={userinfo.ph} onChange={handelUser} />
      </div>
      <div className="col-md-6">
        <label className="form-label">Date</label>
        <input type="date" className="form-control" name="date" value={userinfo.date} onChange={handelUser} />
      </div>
      <div className="col-12">
        <label className="form-label">Address</label>
        <textarea className="form-control" name="Address" value={userinfo.Address} onChange={handelUser} />
      </div>
      <div className="col-12">
        <button type="submit" className="btn" style={{ backgroundColor: "#CCE5FF" }}>Submit</button>
      </div>
    </form>
  );
}

export default CustomerDetailForm;
