import React from 'react';

const CalendarCell = ({id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate, onDelete}) => {
  return (
    <div>
      {name}
    </div>
  )
}

export default CalendarCell;