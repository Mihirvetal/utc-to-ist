import React, { useState } from "react";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [theme, setTheme] = useState(false); // false for light, true for dark
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [utcHour, setUtcHour] = useState(moment(selectedDate).utc().hours()); // Initial UTC hour

  const toggleTheme = () => {
    setTheme(!theme);
  };

  const updateTimeFromUtc = (hour) => {
    const updatedDate = moment(selectedDate)
      .utc()
      .set("hours", hour)
      .toDate();
    setSelectedDate(updatedDate);
    setUtcHour(hour);
  };

  const updateTimeFromIst = (hour) => {
    const utcHourFromIst = (hour - 5.5 + 24) % 24; // Convert IST hour to UTC hour
    const updatedDate = moment(selectedDate)
      .utc()
      .set("hours", utcHourFromIst)
      .toDate();
    setSelectedDate(updatedDate);
    setUtcHour(utcHourFromIst);
  };

  const formatTime = (timezone) => {
    const timezoneId = getTimezoneId(timezone);
    return moment(selectedDate).tz(timezoneId).format("hh:mm A, DD MMM");
  };

  const getTimezoneId = (timezone) => {
    return timezone === "IST" ? "Asia/Kolkata" : "UTC";
  };

  return (
    <div className="container">
      <div className="main">
        <div
          style={{
            backgroundColor: theme ? "black" : "white",
            color: theme ? "white" : "black",
            minHeight: "100vh",
            padding: "20px",
          }}
        >
          <button onClick={toggleTheme}>
            {theme ? "Light Mode" : "Dark Mode"}
          </button>

          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />

          <div style={{ margin: "20px 0" }}>
            <div>
              <label>
                Adjust UTC Hour: <b>{utcHour}:00</b>
              </label>
              <input
                type="range"
                min="0"
                max="23"
                step="1"
                value={utcHour}
                onChange={(e) => updateTimeFromUtc(Number(e.target.value))}
                style={{ width: "100%", marginTop: "10px" }}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <label>
                Adjust IST Hour: <b>{(utcHour + 5.5) % 24}:00</b>
              </label>
              <input
                type="range"
                min="0"
                max="23"
                step="1"
                value={(utcHour + 5.5) % 24}
                onChange={(e) => updateTimeFromIst(Number(e.target.value))}
                style={{ width: "100%", marginTop: "10px" }}
              />
            </div>
          </div>

          <ul style={{ listStyleType: "none", padding: 0 }}>
            {["UTC", "IST"].map((timezone) => (
              <li
                key={timezone}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  backgroundColor: theme ? "#444" : "#f9f9f9",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  {timezone}: {formatTime(timezone)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
