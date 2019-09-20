import React from 'react';
import './ShoppingList.css'

const ShoppingList = ({ingredients}) => {
  const no_dupe_ingreds = ingredients.filter((ingred, i) => {
    return ingredients.indexOf(ingred) === i;
  })
  return (
    <div>
      <p className='title gradient_title'>Shopping List</p>
        <div className='shopping_list'>
          {no_dupe_ingreds.sort().map((ingred, i) => {
            return <p key={i}>{ingred}</p>
          })}
        </div>
    </div>
  )
}

export default ShoppingList;