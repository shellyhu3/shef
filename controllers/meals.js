const addMeals = (db) => (req, res) => {
  const {user_id, recipe_id, name, cals, protein, carbs, fat} = req.body;
  db('foods')
    .where({
      recipe_id: recipe_id
    })
    .select('recipe_id')
    .then(data => {
      if(!data.length) {
        db('foods')
          .returning('recipe_id')
          .insert({
            recipe_id: recipe_id,
            name: name,
            calories: cals,
            protein: protein,
            carbohydrate: carbs,
            fat: fat,
          })
          .then(recipe_id => {
            console.log("recipe_id added ", recipe_id);
          })
      }
    })


  db('meal_plans')
    .where({
      user_id: user_id
    })
    .select('plan_id')
    .then(data => {
      console.log('plan', data)
      if (data.length) {
        console.log('plan found')
        db('meals')
          .returning('*')
          .insert({
            plan_id: data[0].plan_id,
            recipe_id: recipe_id
          })
          .then(meal => {
            res.json(meal[0]);
          })
          .catch(err => res.json(err))
      } else {
        console.log('plan not found')
        db.transaction(trx => {
          trx('meal_plans')
            .returning('plan_id')
            .insert({
              user_id: user_id
            })
            .then(plan_id => {
              console.log('new plan', plan_id[0], recipe_id)
              return trx('meals')
                .returning('recipe_id')
                .insert({
                  plan_id: plan_id[0],
                  recipe_id: recipe_id
                })
                .then(meal => {
                  res.json(meal)
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.json('transaction error'))
      }
    })
}

const getMeals = (db) => (req, res) => {
  const user_id = req.params.id;
  db('meal_plans')
    .where({
      user_id: user_id
    })
    .select('plan_id')
    .then(data =>{
      db('meals')
        .select(['meals.id', 'day_of_wk', 'time_of_day', 'meals.created_at', 'meals.updated_at', 'name', 'calories', 'protein', 'fat', 'carbohydrate'])
        .leftJoin('foods', 'meals.recipe_id', 'foods.recipe_id')
        .where({
          plan_id: data[0].plan_id
        })
        .then(data => res.send(data))
    })
    .catch(err => res.json(''))
}

module.exports = {
  addMeals,
  getMeals
}