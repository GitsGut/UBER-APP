const mongoose = require('mongoose');


function connectToDb()
{
    mongoose.connect(process.env.Db_Connect
    ).then(()=>
    {
        console.log("Connected To Db");
    }).catch(()=>
    {
        console.log("there was a error");
    })
}

module.exports = connectToDb ;