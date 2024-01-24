// CalendarComponent.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
    console.log(date)
  };


  return (
    <div>
      <h2>Calendar Component</h2>
      <Calendar onChange={onChange} value={date} />
      <div>
        <div>
          <form action="">

          </form>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
