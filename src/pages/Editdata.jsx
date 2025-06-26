// Editdata.js
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../assets/styles/Customerdetail.css"


function Editdata({ onclose, onUpdate }) {
  const [userinfo, SetuserInfo] = useState({});

  const handelUser = (e) => {
    const { name, value } = e.target;
    SetuserInfo((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("customer", JSON.stringify(userinfo));
    onUpdate(); // 🔁 Notify Home to refresh data
    onclose();  // ❌ Close modal
  };

  useEffect(() => {
    const saved = localStorage.getItem("customer");
    if (saved) {
      SetuserInfo(JSON.parse(saved));
    }
  }, []);



  return ReactDOM.createPortal(
    <form onSubmit={handelSubmit} className="row g-3 Formcontainer  "  >
      {/* Name */}
      <div className="col-md-6 " >
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handelUser}
          name="name"
          value={userinfo.name || ""}
        />
      </div>

      {/* Email */}
      <div className="col-md-6">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          onChange={handelUser}
          name="email"
          value={userinfo.email || ""}
        />
      </div>

      {/* Phone */}
      <div className="col-md-6">
        <label className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          onChange={handelUser}
          name="ph"
          value={userinfo.ph || ""}
        />
      </div>

      {/* Date */}
      <div className="col-md-6">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          onChange={handelUser}
          name="date"
          value={userinfo.date || ""}
        />
      </div>

      {/* Address */}
      <div className="col-12">
        <label className="form-label">Address</label>
        <textarea
          className="form-control"
          onChange={handelUser}
          name="Address"
          value={userinfo.Address || ""}
          rows="5"
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="col-12 d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <button type="button" className="btn btn-secondary" onClick={onclose}>
          Close
        </button>
      </div>
    </form>,
    document.getElementById("model-root")
  );
}

export default Editdata;
