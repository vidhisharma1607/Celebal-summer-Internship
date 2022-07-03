const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
    
    adminID:{
        type: String,
        unique:true,
        required: true,
    },

    firstName : {
        type: String,
        required: true,
    },

    lastName : {
        type: String,
        required: true,
    },

    email : {
        type : String,
        required : true,
    }
    

});

module.exports = mongoose.model("admin",Admin,"Admin");
