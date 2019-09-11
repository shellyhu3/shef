import React from 'react';
import Meal from './../../components/Meal/Meal';

class MealPlan extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      meal_plan: []
    }
  }

  
  componentDidMount() {
    this.setState({user: localStorage.getItem('user')});

    const id = localStorage.getItem('id');
    this.getPlan(id);
  }


  getPlan = (user_id) => {
    console.log('logged in')
    fetch(`http://localhost:8000/meals/${user_id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => {
        this.setState({meal_plan: data})
      })
  }

  render() {
    const meals = this.state.meal_plan;
    if (meals.length) {
      return (
        <div className='container'>
          meal plans {this.state.user}!!!!!!!!!!!!!
          {meals.map(meal => {
            const {id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate} = meal;
            return <Meal 
              key = {id}
              id = {id}
              day_of_wk = {day_of_wk}
              time_of_day = {time_of_day}
              name = {name}
              calories = {calories}
              protein = {protein}
              fat = {fat}
              carbohydrate = {carbohydrate}
            />
          })}

          <table>
            <thead>
              <tr>
                <th></th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Breakfast</th>
              </tr>
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div className='container'>
          no plans yet
        </div>
      )
    }
  }
}

export default MealPlan;