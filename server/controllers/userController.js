const {User} = require('../models')
class UserController{

    static create(req, res){
       
        let {first_name, last_name, email, date_of_birth, gender, phone_number} = req.body
        if(date_of_birth === undefined){
            date_of_birth = String(new Date())
        }if(gender === undefined){
            gender = 'none'

        }
        User.create({
            first_name,
            last_name,
            email,
            date_of_birth,
            gender,
            phone_number
        })
        .then(()=>{
            res.status(201).json({
                status: 201,
                msg: 'sukses'
            })

        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static login(req, res){
        let {phone_number} = req.body
        User.findOne({
           where: {phone_number: phone_number} 
        })
        .then(data =>{
            if(!data){
                res.status(400).json({
                    status: 400,
                    msg: "The phone number Not exist"
                })
            }else {
                res.status(200).json({
                    status: 200,
                    msg: "Login success"
                })                
            }
        })
        .catch(err=>{
            res.status(401).json(err)
        })


    }

}

module.exports = UserController