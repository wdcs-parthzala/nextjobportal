const { default: mongoose } = require("mongoose")

const connectToDB = async() =>{
    const connectionURL = "mongodb://localhost:27017/jobPortal" 
    mongoose.connect(connectionURL).then(()=> console.log("Database connected successfully"))
    .catch(e=> console.log(e))
}

export default connectToDB;