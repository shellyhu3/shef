import React from 'react';

class MealPlan extends React.Component {


  render() {
    return (
      <div className='container'>
        meal plans {this.props.user.first_name}!!!!!!!!!!!!!
      </div>
    )
  }
}

export default MealPlan;