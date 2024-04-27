import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isAdmin } from "../middleware/isAdmin";

export default function PrivateRouteAdmin() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
  
    const isAd = (currentUser && isAdmin(currentUser._id)) || false;
    console.log(isAd);
  
    useEffect(() => {
      if (!isAd) {
        Swal.fire({
          title: "Error!",
          text: "You are not an Admin",
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/");
        });
      }
    }, [isAd, navigate]);
  
    return currentUser ? <Outlet /> : <Navigate to="/" />;
  }
