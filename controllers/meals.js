const addMeals = (db) => (req, res) => {
  const {user_id, foods_id} = req.body;
  db('meal_plans')
    .where({
      user_id: user_id
    })
    .select('plan_id')
    .then(data => {
      console.log('data', data)
      if (data.length) {
        console.log('plan found')
        db('meals')
          .returning('*')
          .insert({
            plan_id: data[0].plan_id,
            foods_id: foods_id
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
              return trx('meals')
                .returning('*')
                .insert({
                  plan_id: plan_id[0],
                  foods_id: foods_id
                })
                .then(meal => {
                  res.json(meal[0]);
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
  const {user_id} = req.body;
  db('meal_plans')
    .where({
      user_id: user_id
    })
    .select('*')
}

module.exports = {
  addMeals,
  getMeals
}