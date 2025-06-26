import React from "react";
import Logo from "../assets/images/logo.webp";
import "../assets/styles/Side.css";
import { IoHomeSharp } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { Outlet, Link, Navigate } from "react-router-dom";

function Sidebar() {
  return (
    <div className="home-container">
      <div className="sidebar-wrapper">
        <div className="custom-container">
          <div className="d-flex align-items-center justify-content-center">
            <img
              src={Logo}
              className="rounded-circle"
              style={{ width: "46px", height: "46px" }}
              alt="logo"
            />
            <h4 className="ms-4">Vetri Market</h4>
          </div>

          <div className="mt-5">
            <Link
              to="/sidebar/home"
              className="d-flex align-items-center justify-content-center me-4"
              role="button"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IoHomeSharp size={21} />
              <h4 className="mt-2 ms-2">Home</h4>
            </Link>

            <Link
              to="/sidebar/product"
              className="d-flex align-items-center justify-content-center"
              style={{ textDecoration: "none", color: "inherit" }}
              role="button"
            >
              <AiOutlineProduct size={21} />
              <h4 className="mt-2 ms-2">Products</h4>
            </Link>
          </div>
        </div>
      </div>

      {/* Renders nested routes */}
      <Outlet />
    </div>
  );
}

export default Sidebar;
