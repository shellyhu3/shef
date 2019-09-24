const addMeals = (db) => (req, res) => {
  const errors = {};
  const {user_id, recipe_id, name, cals, protein, carbs, fat, day_of_wk, time_of_day, ingredients} = req.body;
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
            ingredients: ingredients
          })
          .then(recipe_id => {
            console.log("recipe_id added ", recipe_id);
            
            db('meal_plans')
              .where({
                user_id: user_id
              })
              .select('plan_id')
              .then(data => {
                if (data.length) {
                  console.log('meal plan found')
                  db('meals')
                    .returning('*')
                    .insert({
                      plan_id: data[0].plan_id,
                      recipe_id: recipe_id,
                      day_of_wk: day_of_wk,
                      time_of_day: time_of_day
                    })
                    .then(meal => {
                      res.json(meal[0]);
                    })
                    .catch(err => {
                      errors.meal = 'meal exists already (choose a different time)';
                      res.json(errors)
                    })
                } else {
                  db.transaction(trx => {
                    trx('meal_plans')
                      .returning('plan_id')
                      .insert({
                        user_id: user_id
                      })
                      .then(plan_id => {
                        return trx('meals')
                          .returning('*')
                          .insert({
                            plan_id: plan_id[0],
                            recipe_id: recipe_id,
                            day_of_wk: day_of_wk,
                            time_of_day: time_of_day
                          })
                          .then(meal => {
                            res.json(meal[0])
                          })
                          .catch(err => console.log(err))
                      })
                      .then(trx.commit)
                      .catch(trx.rollback)
                  })
                  .catch(err => res.json('transaction error'))
                }
              })
          })
      } else {
        db('meal_plans')
          .where({
            user_id: user_id
          })
          .select('plan_id')
          .then(data => {
            if (data.length) {
              db('meals')
                .returning('*')
                .insert({
                  plan_id: data[0].plan_id,
                  recipe_id: recipe_id,
                  day_of_wk: day_of_wk,
                  time_of_day: time_of_day
                })
                .then(meal => {
                  res.json(meal[0]);
                })
                .catch(err => {
                  errors.meal = 'meal exists already (choose a different time)';
                  res.json(errors)
                })
            } else {
              db.transaction(trx => {
                trx('meal_plans')
                  .returning('plan_id')
                  .insert({
                    user_id: user_id
                  })
                  .then(plan_id => {
                    return trx('meals')
                      .returning('*')
                      .insert({
                        plan_id: plan_id[0],
                        recipe_id: recipe_id,
                        day_of_wk: day_of_wk,
                        time_of_day: time_of_day
                      })
                      .then(meal => {
                        res.json(meal[0])
                      })
                      .catch(err => console.log(err))
                  })
                  .then(trx.commit)
                  .catch(trx.rollback)
              })
              .catch(err => res.json('transaction error'))
            }
          })
      }
    })
      



  // db('meal_plans')
  //   .where({
  //     user_id: user_id
  //   })
  //   .select('plan_id')
  //   .then(data => {
  //     if (data.length) {
  //       db('meals')
  //         .returning('*')
  //         .insert({
  //           plan_id: data[0].plan_id,
  //           recipe_id: recipe_id,
  //           day_of_wk: day_of_wk,
  //           time_of_day: time_of_day
  //         })
  //         .then(meal => {
  //           res.json(meal[0]);
  //         })
  //         .catch(err => {
  //           errors.meal = 'meal exists already (choose a different time)';
  //           res.json(errors)
  //         })
  //     } else {
  //       db.transaction(trx => {
  //         trx('meal_plans')
  //           .returning('plan_id')
  //           .insert({
  //             user_id: user_id
  //           })
  //           .then(plan_id => {
  //             return trx('meals')
  //               .returning('*')
  //               .insert({
  //                 plan_id: plan_id[0],
  //                 recipe_id: recipe_id,
  //                 day_of_wk: day_of_wk,
  //                 time_of_day: time_of_day
  //               })
  //               .then(meal => {
  //                 res.json(meal[0])
  //               })
  //               .catch(err => console.log(err))
  //           })
  //           .then(trx.commit)
  //           .catch(trx.rollback)
  //       })
  //       .catch(err => res.json('transaction error'))
  //     }
  //   })
}

const getMeals = (db) => (req, res) => {
  const user_id = req.params.user_id;
  db('meal_plans')
    .where({
      user_id: user_id
    })
    .select('plan_id')
    .then(data =>{
      db('meals')
        .select(['meals.id', 'day_of_wk', 'time_of_day', 'meals.created_at', 'meals.updated_at', 'name', 'calories', 'protein', 'fat', 'carbohydrate', 'meals.recipe_id'])
        .leftJoin('foods', 'meals.recipe_id', 'foods.recipe_id')
        .where({
          plan_id: data[0].plan_id
        })
        .orderByRaw(
          `CASE
          WHEN day_of_wk = 'Monday' THEN 1
          WHEN day_of_wk = 'Tuesday' THEN 2
          WHEN day_of_wk = 'Wednesday' THEN 3
          WHEN day_of_wk = 'Thursday' THEN 4
          WHEN day_of_wk = 'Friday' THEN 5
          WHEN day_of_wk = 'Saturday' THEN 6
          WHEN day_of_wk = 'Sunday' THEN 7
          END ASC`
        )
        .orderByRaw(
          `CASE
          WHEN time_of_day = 'Breakfast' THEN 1
          WHEN time_of_day = 'Snack 1' THEN 2
          WHEN time_of_day = 'Lunch' THEN 3
          WHEN time_of_day = 'Snack 2' THEN 4
          WHEN time_of_day = 'Dinner' THEN 5
          END ASC`
        )
        .then(data => res.send(data))
    })
    .catch(err => res.json(''))
}

const getMealsDetails = (db) => (req, res) => {
  const user_id = req.params.user_id;
  db('meal_plans')
    .where({
      user_id: user_id
    })
    .select('plan_id')
    .then(data =>{
      db('meals')
        .select('day_of_wk')
        .sum('calories as total_cals')
        .sum('protein as total_p')
        .sum('fat as total_f')
        .sum('carbohydrate as total_c')
        .leftJoin('foods', 'meals.recipe_id', 'foods.recipe_id')
        .where({
          plan_id: data[0].plan_id
        })
        .groupBy('day_of_wk')
        .orderByRaw(
          `CASE
          WHEN day_of_wk = 'Monday' THEN 1
          WHEN day_of_wk = 'Tuesday' THEN 2
          WHEN day_of_wk = 'Wednesday' THEN 3
          WHEN day_of_wk = 'Thursday' THEN 4
          WHEN day_of_wk = 'Friday' THEN 5
          WHEN day_of_wk = 'Saturday' THEN 6
          WHEN day_of_wk = 'Sunday' THEN 7
          END ASC`
        )
        .then(data => {
          res.send(data)})
    })
    .catch(err => res.json(''))
}

const getIngredients = (db) => (req, res) => {
  const user_id = req.params.user_id;
  db('meal_plans')
    .where({
      user_id: user_id
    })
    .select('plan_id')
    .then(data =>{
      db('meals')
        .select('ingredients')
        .leftJoin('foods', 'meals.recipe_id', 'foods.recipe_id')
        .where({
          plan_id: data[0].plan_id
        })
        .then(data => {
          res.send(data)
        })
    })
    .catch(err => res.json(''))
}

const deleteMeal = (db) => (req, res) => {
  const id = req.params.id;
  db('meals')
    .where({
      id: id
    })
    .returning(['day_of_wk', 'time_of_day'])
    .del()
    .then(data => res.send(data))
}

module.exports = {
  addMeals,
  getMeals,
  getMealsDetails,
  getIngredients,
  deleteMeal
}