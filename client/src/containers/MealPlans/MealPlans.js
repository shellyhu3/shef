import React from 'react';
import AllMeals from './../../components/AllMeals/AllMeals';

import './MealPlans.css';

const initialState = {
  user: '',
  meal_plan: [],
  loading: true,
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

const resetState = {
  user: '',
  meal_plan: [],
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
    this.setState({loading: false})
  }


  getPlan = (user_id) => {
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
        });
      })
      .catch(err => console.log(err));
  }

  onDelete = (id) => {
    const user_id = localStorage.getItem('id');
    fetch(`http://localhost:8000/meals/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => {
        console.log('deleted', data)
        this.setState(resetState);
        this.getPlanDetails(user_id);
        this.getPlan(user_id);
      })
      .catch(err => console.log(err));
  }

  render() {
    const meals = this.state.meal_plan;
    console.log(meals)
    let m1, m2, m3, m4, m5, t1, t2, t3, t4, t5, w1, w2, w3, w4, w5, th1, th2, th3, th4, th5, f1, f2, f3, f4, f5, sa1, sa2, sa3, sa4, sa5, su1, su2, su3, su4, su5;

    return (
      <div className='container'>
        {meals.forEach(meal => {
          const {day_of_wk, time_of_day, name} = meal;
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
        })}

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
              <td>{m1}</td>
              <td>{t1}</td>
              <td>{w1}</td>
              <td>{th1}</td>
              <td>{f1}</td>
              <td>{sa1}</td>
              <td>{su1}</td>
            </tr>
            <tr className='calendar_main'>
              <th className='big_screen'>Snack 1</th>
              <th className='sm_screen'>S1</th>                
              <td>{m2}</td>
              <td>{t2}</td>
              <td>{w2}</td>
              <td>{th2}</td>
              <td>{f2}</td>
              <td>{sa2}</td>
              <td>{su2}</td>
            </tr>
            <tr className='calendar_main'>
              <th className='big_screen'>Lunch</th>
              <th className='sm_screen'>L</th>                
              <td>{m3}</td>
              <td>{t3}</td>
              <td>{w3}</td>
              <td>{th3}</td>
              <td>{f3}</td>
              <td>{sa3}</td>
              <td>{su3}</td>
            </tr>
            <tr className='calendar_main'>
              <th className='big_screen'>Snack 2</th>
              <th className='sm_screen'>S2</th>                
              <td>{m4}</td>
              <td>{t4}</td>
              <td>{w4}</td>
              <td>{th4}</td>
              <td>{f4}</td>
              <td>{sa4}</td>
              <td>{su4}</td>
            </tr>
            <tr className='calendar_main'>
              <th className='big_screen'>Dinner</th>
              <th className='sm_screen'>D</th>                
              <td>{m5}</td>
              <td>{t5}</td>
              <td>{w5}</td>
              <td>{th5}</td>
              <td>{f5}</td>
              <td>{sa5}</td>
              <td>{su5}</td>
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
          </tbody>
        </table>

        <AllMeals meals={meals} onDelete={this.onDelete}/>
      </div>
    )
  }
}

export default MealPlan;