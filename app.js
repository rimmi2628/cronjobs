const express=require("express");
const cron=require('node-cron');
const app=express();
const bodyParser = require('body-parser');
const fs=require('fs');
const nodemailer=require('nodemailer');
const ejs=require('ejs')
app.set("view engine", "ejs");
require('dotenv').config();

const port=process.env.port ||3000;

app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());

const transpoter=nodemailer.createTransport({
  service:'gmail',
  pool: true, 

    auth:{
        user:process.env.User_email,
        pass:process.env.User_password
    },
    tls: {
      rejectUnauthorized: false
    }

});



// app.get('/email',(req,res)=>{
//   try {
//     console.log("abc");
//     res.render('cron')
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.post("/email",(req,res)=>{
    // const email=req.body.email
    const dummyemail=['rimmi@mailinator.com','ridhi@mailinator.com','shakshi@mailinator.com']
    const  mailOptions = {
        from: "s12348946@gmail.com",
        to: dummyemail,
        subject: "Test mail using Cron job",
        text: "Hello how are u"
    };

    const data=  cron.schedule('* * * * * *',function(){
      const email=[];
      for (const em of dummyemail){
         email.push(em);
      }
      transpoter.sendMail(mailOptions, 
        function(err, data) {
        if (err) {
        console.log("Error Occurs", err);
        } else {
        console.log("Email sent successfully");
        }
        });
})

  
        
         
      
// })


// cron.schedule('1 * * * * *',function(){
//     const data=`hello,welcome\n`;

//     fs.appendFile('test.txt',data,function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("file data added");
//     })

//     // console.log("cronjob");
    
// })



// const  task = cron.schedule('* * * * * *', () =>  {
//     console.log('will execute every minute until stopped');
//   });
  
//   task.stop();
// cron.schedule("* * * * * *", function() {
  
//     // Data to write on file
//     let data = `${new Date().toUTCString()} 
//                 : Server is working\n`;
      
//     // Appending data to logs.txt file
//     fs.appendFile("logs.txt", data, function(err) {
          
//         if (err) throw err;
          
//         console.log("Status Logged!");
//     });
// });

app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());





app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });