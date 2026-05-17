import React, { useEffect } from "react";
import "../../CSS/BookingDetails.css";
import PropertyImg from "../PropertyDetails/PropertyImg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  cancelBooking,
  fetchBookingDetails,
  fetchUserBookings,
} from "../../Store/Booking/booking-action";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {bookingId} = useParams();
  const { bookingDetails } = useSelector((state)=> state.booking);

  useEffect(() => {
    dispatch(fetchBookingDetails(bookingId));
  }, [dispatch, bookingId]);

  const handleCancelBooking = async () => {
    try {
      await dispatch(cancelBooking(bookingId));
      dispatch(fetchUserBookings());
      toast.success("Booking cancelled successfully");
      navigate("/user/booking");
    } catch (error) {
      toast.error("Unable to cancel booking");
    }
  };

  if(!bookingDetails || !bookingDetails.property) {
    return <div>Loading...</div>;
  }


  return (
    <div className="details-container">
      <p className="details-header">{bookingDetails.property.propertyName}</p>
      <h6 className="details-location">
        <span className="material-symbols-outlined">location_on</span>
        <span className="location">
          {bookingDetails.property.address.area},{" "}
          {bookingDetails.property.address.city},{" "}
          {bookingDetails.property.address.pincode},{" "}
          {bookingDetails.property.address.state}
        </span>
      </h6>
      <div className="details-information-container">
        <div className="details-information">
          <h5>Booking Information</h5>
          <section className="booking-stay-information">
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                bedtime
              </span>
              {bookingDetails.numberOfnights} nights
            </span>
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                calendar_month
              </span>
              {new Date(bookingDetails.fromDate).toLocaleDateString()}
            </span>
            <span className="material-symbols-outlined stay-icon">
              arrow_forward
            </span>
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                calendar_month
              </span>
              {new Date(bookingDetails.toDate).toLocaleDateString()}
            </span>
          </section>
        </div>
        <div className="details-total-price-container">
          <div className="details-total-price">
            <p className="price-header">Total Price</p>
            <span className="price-in-number">
              &#8377; {bookingDetails.price}
            </span>
          </div>
        </div>
      </div>
      <div className="propertyimg-container">
        <PropertyImg images={bookingDetails.property.images} />
      </div>
      <div className="d-flex justify-content-end px-3 pb-4">
        <button className="btn btn-danger" onClick={handleCancelBooking}>
          Cancel Booking
        </button>
      </div>
      <br /> <br />
    </div>
  );
};

export default BookingDetails;
