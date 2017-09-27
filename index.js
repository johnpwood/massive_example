const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');
const {database, dbUser, dbPassword} = require('./config')

const port = 3000;
const connectionString = `postgres://${dbUser}:${dbPassword}@localhost/${database}`

const app = express();
const usersCtrl = require('./usersCtrl')

app.use(json());

const massiveConnection = massive(connectionString).then(db=>{app.set('db',db)}).catch(e=>{console.log(e)})

app.get('/api/test', (req, res, next) => {
   const db = app.get('db')
   db.users.find({}).then(results=>{
     res.json(results)
   }).catch(e=>res.json(e))
});

app.get('/api/users', usersCtrl.getUserByName)


app.listen(port, () => {
   console.log(`Listening on port: ${port}`);
})
