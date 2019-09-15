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
      .catch(err => console.log(err));
  }

  onDelete = (id) => {
    const user_id = localStorage.getItem('id');
    console.log(user_id)
    fetch(`http://localhost:8000/meals/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then(this.getPlan(user_id))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.meal_plan)
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
              onDelete = {this.onDelete}
            />
          })}

          <table>
            <thead>
              <tr>
                <th></th>
                <th>M</th>
                <th>T</th>
                <th>W</th>
                <th>Th</th>
                <th>F</th>
                <th>Sa</th>
                <th>Su</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Breakfast</th>
              </tr>
              <tr>
                <th>Lunch</th>
              </tr>
              <tr>
                <th>Dinner</th>
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