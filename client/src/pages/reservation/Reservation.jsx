import Footer from "../../components/footer/Footer";
import ReservationHeader from "../../components/reservationHeader/reservationHeader";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./Reservation.css";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
// import Featured from "../../components/featured/Featured";
// import axios from "axios";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";

// import ReactToPrint from "react-to-print";
// import React, { useRef } from "react";

// export function PrintComponent() {
//   let componentRef = useRef();

//   return (
//     <>
//       <div id="print_component">
//         {/* button to trigger printing of target component */}
//         <ReactToPrint
//           trigger={() => <button>Print this out!</button>}
//           content={() => this.componentRef}
//         />

//         {/* component to be printed */}
//         <div style={{ display: "none" }}>
//           <ComponentToPrint ref={(el) => (this.componentRef = el)} />
//         </div>
//       </div>
//     </>
//   );
// }

const Reservation = () => {
  const { user } = useContext(AuthContext);
  //   console.log(user._id);
  // const user = {
  //   "_id": "my ID"
  // };
  const { data } = useFetch(`/users/${user._id}`);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    setReservations(data.reservations);
  }, [data.reservations]);
  //   console.log("userinf", reservations);

  // class ComponentToPrint extends React.Component {
  // render() {
  return (
    <div>
      <Navbar />
      <ReservationHeader />
      <div className="reservationContainer">
        <h1 className="reservationTitle">
          {reservations && reservations.length
            ? "Your Upcoming Trips"
            : "You have no coming trips. Start your journey by making a reservation. 😎"}
        </h1>
        {reservations &&
          reservations.map((item) => (
            <div className="searchItem" key={item.id}>
              <img
                src={
                  item.reservation.hotelPhoto
                    ? item.reservation.hotelPhoto
                    : "https://images.unsplash.com/photo-1506126483163-f4d1558dbf85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJhaGFyaSUyMGJlYWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
                alt=""
                className="siImg"
              />
              <div className="siDesc">
                <h1 className="siTitle">{item.reservation.hotelName}</h1>
                <span className="siTaxiOp">Free Cancellation</span>
                <span className="siSubtitle">
                  Room Info :{" "}
                  <b>
                    {item.reservation.roomNum.map((num) => (
                      <b> {num} </b>
                    ))}
                  </b>
                </span>
                <span className="siFeatures">{item.desc}</span>
                <span className="siCancelOp">Travel Period </span>
                <span className="siCancelOpSubtitle">
                  Start Date: {item.reservation.dateStart?.slice(0, 10)}
                </span>
                <span className="siCancelOpSubtitle">
                  End Date: {item.reservation.dateEnd?.slice(0, 10)}
                </span>
              </div>
              <div className="siDetails">
                <div className="siDetailTexts">
                  <span className="siTaxOp"></span>
                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={
                      <Popover id="popover-basic">
                        <Popover.Header as="h3">Hotel Info</Popover.Header>
                        <Popover.Body>
                          <div className="location">
                            Location : {item.reservation.location}
                          </div>
                          <div className="cityTitle">
                            City : {item.reservation.city}
                          </div>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <Button variant="success">Details</Button>
                  </OverlayTrigger>
                  <button type="button" onClick={window.print}>
                    Print
                  </button>
                </div>
              </div>
            </div>
          ))}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};
//   }
// };

export default Reservation;
