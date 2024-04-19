const mongoose = require("mongoose")

const db = "mongodb+srv://mrhycron:gGSK5XmhM7WWsNQf@test.pmznjoy.mongodb.net/?retryWrites=true&w=majority&appName=test"

mongoose.connect(db)
.then(()=>{
    console.log("mongodb connected");
})
.catch(() => {
    console.log("Failed to connect mongodb");
})

const LogInSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
})

//Il modello seguirà lo schema scritto sopra, nome e pass.

const collection = new mongoose.model("LogInCollection", LogInSchema)

//Esporta con lo stesso nome

module.exports = collection

