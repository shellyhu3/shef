import React from 'react';
import Meal from './../../components/Meal/Meal';
import './MealPlans.css';

class MealPlan extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      meal_plan: [],
      plan_det: []
      // mon: {
      //   cals: 0,
      //   p: 0,
      //   f: 0,
      //   c: 0
      // },
      // tues: {
      //   cals: 0,
      //   p: 0,
      //   f: 0,
      //   c: 0
      // },
      // wed: {
      //   cals: 0,
      //   p: 0,
      //   f: 0,
      //   c: 0
      // },
      // thurs: {
      //   cals: 0,
      //   p: 0,
      //   f: 0,
      //   c: 0
      // },
      // fri: {
      //   cals: 0,
      //   p: 0,
      //   f: 0,
      //   c: 0
      // },
      // sat: {
      //   cals: 0,
      //   p: 0,
      //   f: 0,
      //   c: 0
      // },
      // sun: {
      //   cals: 0,
      //   p: 0,
      //   f: 0,
      //   c: 0
      // }
    }
  }

  
  componentDidMount() {
    this.setState({user: localStorage.getItem('user')});

    const id = localStorage.getItem('id');
    this.getPlan(id);
    this.getPlanDetails(id);
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

  getPlanDetails = (user_id) => {
    fetch(`http://localhost:8000/meals_details/${user_id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => {
        this.setState({plan_det: data})
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
    console.log(this.state.meal_plan, this.state.plan_det)
    const meals = this.state.meal_plan;
    let m1, m2, m3, m4, m5, t1, t2, t3, t4, t5, w1, w2, w3, w4, w5, th1, th2, th3, th4, th5, f1, f2, f3, f4, f5, sa1, sa2, sa3, sa4, sa5, su1, su2, su3, su4, su5;

    if (meals.length) {
      return (
        <div className='container'>
          meal plans {this.state.user}!!!!!!!!!!!!!

          {meals.map(meal => {
            const {id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate} = meal;
            if (day_of_wk==='Monday') {
              if (time_of_day==='Breakfast') {
                m1 = name;
              } else if (time_of_day==='Snack 1') {
                m2 = name;
              } else if (time_of_day==='Lunch') {
                m3 = name;
              } else if (time_of_day==='Snack 2') {
                m4 = name;
              } else if (time_of_day==='Dinner') {
                m5 = name;
              }
            } else if (day_of_wk==='Tuesday') {
              if (time_of_day==='Breakfast') {
                t1 = name;
              } else if (time_of_day==='Snack 1') {
                t2 = name;
              } else if (time_of_day==='Lunch') {
                t3 = name;
              } else if (time_of_day==='Snack 2') {
                t4 = name;
              } else if (time_of_day==='Dinner') {
                t5 = name;
              }
            } else if (day_of_wk==='Wednesday') {
              if (time_of_day==='Breakfast') {
                w1 = name;
              } else if (time_of_day==='Snack 1') {
                w2 = name;
              } else if (time_of_day==='Lunch') {
                w3 = name;
              } else if (time_of_day==='Snack 2') {
                w4 = name;
              } else if (time_of_day==='Dinner') {
                w5 = name;
              }
            } else if (day_of_wk==='Thursday') {
              if (time_of_day==='Breakfast') {
                th1 = name;
              } else if (time_of_day==='Snack 1') {
                th2 = name;
              } else if (time_of_day==='Lunch') {
                th3 = name;
              } else if (time_of_day==='Snack 2') {
                th4 = name;
              } else if (time_of_day==='Dinner') {
                th5 = name;
              }
            } else if (day_of_wk==='Friday') {
              if (time_of_day==='Breakfast') {
                f1 = name;
              } else if (time_of_day==='Snack 1') {
                f2 = name;
              } else if (time_of_day==='Lunch') {
                f3 = name;
              } else if (time_of_day==='Snack 2') {
                f4 = name;
              } else if (time_of_day==='Dinner') {
                f5 = name;
              }
            } else if (day_of_wk==='Saturday') {
              if (time_of_day==='Breakfast') {
                sa1 = name;
              } else if (time_of_day==='Snack 1') {
                sa2 = name;
              } else if (time_of_day==='Lunch') {
                sa3 = name;
              } else if (time_of_day==='Snack 2') {
                sa4 = name;
              } else if (time_of_day==='Dinner') {
                sa5 = name;
              }
            } else if (day_of_wk==='Sunday') {
              if (time_of_day==='Breakfast') {
                su1 = name;
              } else if (time_of_day==='Snack 1') {
                su2 = name;
              } else if (time_of_day==='Lunch') {
                su3 = name;
              } else if (time_of_day==='Snack 2') {
                su4 = name;
              } else if (time_of_day==='Dinner') {
                su5 = name;
              }
            }
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

          <table className='calendar'>
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
                <th>{m1}</th>
                <th>{t1}</th>
                <th>{w1}</th>
                <th>{th1}</th>
                <th>{f1}</th>
                <th>{sa1}</th>
                <th>{su1}</th>
              </tr>
              <tr>
                <th>Snack 1</th>
                <th>{m2}</th>
                <th>{t2}</th>
                <th>{w2}</th>
                <th>{th2}</th>
                <th>{f2}</th>
                <th>{sa2}</th>
                <th>{su2}</th>
              </tr>
              <tr>
                <th>Lunch</th>
                <th>{m3}</th>
                <th>{t3}</th>
                <th>{w3}</th>
                <th>{th3}</th>
                <th>{f3}</th>
                <th>{sa3}</th>
                <th>{su3}</th>
              </tr>
              <tr>
                <th>Snack 2</th>
                <th>{m4}</th>
                <th>{t4}</th>
                <th>{w4}</th>
                <th>{th4}</th>
                <th>{f4}</th>
                <th>{sa4}</th>
                <th>{su4}</th>
              </tr>
              <tr>
                <th>Dinner</th>
                <th>{m5}</th>
                <th>{t5}</th>
                <th>{w5}</th>
                <th>{th5}</th>
                <th>{f5}</th>
                <th>{sa5}</th>
                <th>{su5}</th>
              </tr>
              <tr>
                <th>Total Calories</th>
                {this.state.plan_det.length 
                  ? <th>{this.state.plan_det[0].total_cals}</th>
                  : <th></th>
                }
                {this.state.plan_det.length 
                  ? <th>{this.state.plan_det[1].total_cals}</th>
                  : <th></th>
                }
                {this.state.plan_det.length 
                  ? <th>{this.state.plan_det[2].total_cals}</th>
                  : <th></th>
                }
                {this.state.plan_det.length 
                  ? <th>{this.state.plan_det[3].total_cals}</th>
                  : <th></th>
                }
                {this.state.plan_det.length 
                  ? <th>{this.state.plan_det[4].total_cals}</th>
                  : <th></th>
                }
                {this.state.plan_det.length 
                  ? <th>{this.state.plan_det[5].total_cals}</th>
                  : <th></th>
                }
                {this.state.plan_det.length 
                  ? <th>{this.state.plan_det[6].total_cals}</th>
                  : <th></th>
                }
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