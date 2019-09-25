import React from 'react';
import AllMeals from './../../components/AllMeals/AllMeals';
import ShoppingList from './../../components/ShoppingList/ShoppingList';


import './MealPlans.css';

const initialState = {
  user: '',
  meal_plan: [],
  all_ingredients: [],
  Monday: {
    cals: 0,
    p: 0,
    f: 0,
    c: 0
  },
  Tuesday: {
    cals: 0,
    p: 0,
    f: 0,
    c: 0
  },
  Wednesday: {
    cals: 0,
    p: 0,
    f: 0,
    c: 0
  },
  Thursday: {
    cals: 0,
    p: 0,
    f: 0,
    c: 0
  },
  Friday: {
    cals: 0,
    p: 0,
    f: 0,
    c: 0
  },
  Saturday: {
    cals: 0,
    p: 0,
    f: 0,
    c: 0
  },
  Sunday: {
    cals: 0,
    p: 0,
    f: 0,
    c: 0
  }
}


class MealPlan extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  
  componentDidMount() {
    this.setState({user: localStorage.getItem('user')});

    const id = localStorage.getItem('id');
    this.getPlan(id);
    this.getPlanDetails(id);
    this.getIngreds(id);
    this.setState({loading: false})
  }


  getPlan = (user_id) => {
    fetch(`/api/meals/${user_id}`, {
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
    fetch(`/api/meals_foods/${user_id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          data.forEach(element => {
            this.setState(prevState => ({
              [element.day_of_wk]: { 
                ...prevState[element.day_of_wk],
                cals: element.total_cals,
                p: element.total_p,
                f: element.total_f,
                c: element.total_c
              }
            }))
          })
        }
      })
      .catch(err => console.log(err));
  }

  getIngreds = (user_id) => {
    fetch(`/api/foods/${user_id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => {
        if(data) {
          data.forEach(food => {
            food.ingredients.forEach(ingred => {
              this.setState(prevState => ({
                all_ingredients: [
                  ...prevState.all_ingredients,
                  ingred
                ]
              }))
            })
          })
        }
      })
      .catch(err => console.log(err));
  }

  onDelete = (id) => {
    const user_id = localStorage.getItem('id');
    fetch(`/api/meals/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => {
        this.setState(initialState);
        this.getPlan(user_id);
        this.getPlanDetails(user_id);
        this.getIngreds(user_id);
      })
      .catch(err => console.log(err));
  }

  render() {
    const meals = this.state.meal_plan;
    let m1=[], m2=[], m3=[], m4=[], m5=[], t1=[], t2=[], t3=[], t4=[], t5=[], w1=[], w2=[], w3=[], w4=[], w5=[], th1=[], th2=[], th3=[], th4=[], th5=[], f1=[], f2=[], f3=[], f4=[], f5=[], sa1=[], sa2=[], sa3=[], sa4=[], sa5=[], su1=[], su2=[], su3=[], su4=[], su5=[];

    return (
      <div className='container'>
        <p className='title gradient_title'>{this.state.user}'s meal plan</p>
        <br></br>

        {meals.length ?
          meals.forEach(meal => {
            const {day_of_wk, time_of_day, name} = meal;
            if (day_of_wk==='Monday') {
              if (time_of_day==='Breakfast') {
                m1.push(name);
              } else if (time_of_day==='Snack 1') {
                m2.push(name);
              } else if (time_of_day==='Lunch') {
                m3.push(name);
              } else if (time_of_day==='Snack 2') {
                m4.push(name);
              } else if (time_of_day==='Dinner') {
                m5.push(name);
              }
            } else if (day_of_wk==='Tuesday') {
              if (time_of_day==='Breakfast') {
                t1.push(name);
              } else if (time_of_day==='Snack 1') {
                t2.push(name);
              } else if (time_of_day==='Lunch') {
                t3.push(name);
              } else if (time_of_day==='Snack 2') {
                t4.push(name);
              } else if (time_of_day==='Dinner') {
                t5.push(name);
              }
            } else if (day_of_wk==='Wednesday') {
              if (time_of_day==='Breakfast') {
                w1.push(name);
              } else if (time_of_day==='Snack 1') {
                w2.push(name);
              } else if (time_of_day==='Lunch') {
                w3.push(name);
              } else if (time_of_day==='Snack 2') {
                w4.push(name);
              } else if (time_of_day==='Dinner') {
                w5.push(name);
              }
            } else if (day_of_wk==='Thursday') {
              if (time_of_day==='Breakfast') {
                th1.push(name);
              } else if (time_of_day==='Snack 1') {
                th2.push(name);
              } else if (time_of_day==='Lunch') {
                th3.push(name);
              } else if (time_of_day==='Snack 2') {
                th4.push(name);
              } else if (time_of_day==='Dinner') {
                th5.push(name);
              }
            } else if (day_of_wk==='Friday') {
              if (time_of_day==='Breakfast') {
                f1.push(name);
              } else if (time_of_day==='Snack 1') {
                f2.push(name);
              } else if (time_of_day==='Lunch') {
                f3.push(name);
              } else if (time_of_day==='Snack 2') {
                f4.push(name);
              } else if (time_of_day==='Dinner') {
                f5.push(name);
              }
            } else if (day_of_wk==='Saturday') {
              if (time_of_day==='Breakfast') {
                sa1.push(name);
              } else if (time_of_day==='Snack 1') {
                sa2.push(name);
              } else if (time_of_day==='Lunch') {
                sa3.push(name);
              } else if (time_of_day==='Snack 2') {
                sa4.push(name);
              } else if (time_of_day==='Dinner') {
                sa5.push(name);
              }
            } else if (day_of_wk==='Sunday') {
              if (time_of_day==='Breakfast') {
                su1.push(name);
              } else if (time_of_day==='Snack 1') {
                su2.push(name);
              } else if (time_of_day==='Lunch') {
                su3.push(name);
              } else if (time_of_day==='Snack 2') {
                su4.push(name);
              } else if (time_of_day==='Dinner') {
                su5.push(name);
              }
            }
          })
          : ''
        }

        <table className='calendar'>
          <thead>
            <tr className='calendar_main'>
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
            <tr className='calendar_main'>
              <th className='big_screen'>Breakfast</th>
              <th className='sm_screen'>B</th>
              <td>{m1.join()}</td>
              <td>{t1.join()}</td>
              <td>{w1.join()}</td>
              <td>{th1.join()}</td>
              <td>{f1.join()}</td>
              <td>{sa1.join()}</td>
              <td>{su1.join()}</td>
            </tr>
            <tr className='calendar_main'>
              <th className='big_screen'>Snack 1</th>
              <th className='sm_screen'>S1</th>                
              <td>{m2.join()}</td>
              <td>{t2.join()}</td>
              <td>{w2.join()}</td>
              <td>{th2.join()}</td>
              <td>{f2.join()}</td>
              <td>{sa2.join()}</td>
              <td>{su2.join()}</td>
            </tr>
            <tr className='calendar_main'>
              <th className='big_screen'>Lunch</th>
              <th className='sm_screen'>L</th>                
              <td>{m3.join()}</td>
              <td>{t3.join()}</td>
              <td>{w3.join()}</td>
              <td>{th3.join()}</td>
              <td>{f3.join()}</td>
              <td>{sa3.join()}</td>
              <td>{su3.join()}</td>
            </tr>
            <tr className='calendar_main'>
              <th className='big_screen'>Snack 2</th>
              <th className='sm_screen'>S2</th>                
              <td>{m4.join()}</td>
              <td>{t4.join()}</td>
              <td>{w4.join()}</td>
              <td>{th4.join()}</td>
              <td>{f4.join()}</td>
              <td>{sa4.join()}</td>
              <td>{su4.join()}</td>
            </tr>
            <tr className='calendar_main'>
              <th className='big_screen'>Dinner</th>
              <th className='sm_screen'>D</th>                
              <td>{m5.join()}</td>
              <td>{t5.join()}</td>
              <td>{w5.join()}</td>
              <td>{th5.join()}</td>
              <td>{f5.join()}</td>
              <td>{sa5.join()}</td>
              <td>{su5.join()}</td>
            </tr>
            <tr className='macros'>
              <th className='big_screen'>Calories</th>
              <th className='sm_screen'>Cals</th>                
              <td>{this.state.Monday.cals}</td>
              <td>{this.state.Tuesday.cals}</td>
              <td>{this.state.Wednesday.cals}</td>
              <td>{this.state.Thursday.cals}</td>
              <td>{this.state.Friday.cals}</td>
              <td>{this.state.Saturday.cals}</td>
              <td>{this.state.Sunday.cals}</td>
            </tr>
            <tr className='macros'>
              <th className='big_screen'>Protein</th>
              <th className='sm_screen'>P</th>                
              <td>{this.state.Monday.p}</td>
              <td>{this.state.Tuesday.p}</td>
              <td>{this.state.Wednesday.p}</td>
              <td>{this.state.Thursday.p}</td>
              <td>{this.state.Friday.p}</td>
              <td>{this.state.Saturday.p}</td>
              <td>{this.state.Sunday.p}</td>
            </tr>
            <tr className='macros'>
              <th className='big_screen'>Carbs</th>
              <th className='sm_screen'>C</th>                
              <td>{this.state.Monday.c}</td>
              <td>{this.state.Tuesday.c}</td>
              <td>{this.state.Wednesday.c}</td>
              <td>{this.state.Thursday.c}</td>
              <td>{this.state.Friday.c}</td>
              <td>{this.state.Saturday.c}</td>
              <td>{this.state.Sunday.c}</td>
            </tr>
            <tr className='macros'>
              <th className='big_screen'>Fat</th>
              <th className='sm_screen'>F</th>                
              <td>{this.state.Monday.f}</td>
              <td>{this.state.Tuesday.f}</td>
              <td>{this.state.Wednesday.f}</td>
              <td>{this.state.Thursday.f}</td>
              <td>{this.state.Friday.f}</td>
              <td>{this.state.Saturday.f}</td>
              <td>{this.state.Sunday.f}</td>
            </tr>
          </tbody>
        </table>

        <AllMeals meals={meals} onDelete={this.onDelete}/>
        <ShoppingList ingredients={this.state.all_ingredients}/>
      </div>
    )
  }
}

export default MealPlan;