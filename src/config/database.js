const mongoose=require("mongoose");


async function connectTODB(){
    try{

        mongoose.connect(process.env.MONGO_URI);
        console.log("Conected to databse")
    }catch(err){
        console.log(err);
    }
}


module.exports=connectTODB;