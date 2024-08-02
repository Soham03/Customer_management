const express=require("express")
const cors=require("cors")
const connectDB = require('./config');


const app=express();
connectDB()
const PORT=process.env.PORT||5000;

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
