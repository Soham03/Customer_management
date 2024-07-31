const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
require("./mongoose");



// dotenv.config()
const app=express();
const PORT=process.env.PORT||5003;
app.use(cors())
app.use(express.json())

const customerRoutes=require('./routes/customerRoutes')
const accountRoutes=require('./routes/accountRoutes')
const transactionRoutes=require('./routes/transactionRoutes')

app.use(customerRoutes)
app.use(accountRoutes)
app.use(transactionRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
