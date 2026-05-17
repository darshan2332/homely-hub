import api from "../../api/client";
import { addBooking, setBookings, setBookingDetails } from "./booking-slice";

export const createBooking = (bookingDate) => async (dispatch) => {
  try {
    const response = await api.post(
      "/api/v1/rent/user/booking/new",
      bookingDate
    );
    dispatch(addBooking(response.data.data.booking));
  } catch (error) {
    console.error("Error creating booking:", error);
  }
};

export const fetchBookingDetails = (bookingId) => async (dispatch) => {
  try {
    const response = await api.get(`/api/v1/rent/user/booking/${bookingId}`);
    dispatch(setBookingDetails(response.data.data));
  } catch (error) {
    console.error("Error fetching booking details", error);
  }
};

export const fetchUserBookings = () => async (dispatch) => {
  try {
    const response = await api.get("/api/v1/rent/user/booking");
    dispatch(setBookings(response.data.data.bookings));
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

export const cancelBooking = (bookingId) => async () => {
  try {
    await api.delete(`/api/v1/rent/user/booking/${bookingId}`);
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw error;
  }
};
