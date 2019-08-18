const {User} = require('../models')
class Validation{

    static cekFormat(req, res, next){
        let {phone_number} = req.body
        let cekNomor = phone_number.slice(0,2)
        if(cekNomor === "62"){
            next()
        }else{
            res.status(401).json({
                msg : "mobile phone must indonesian format"
            })
        }
    }

    static cekUniquePhone(req, res, next){
        let {phone_number} = req.body
        User.findOne({
           where: {phone_number: phone_number} 
        })
        .then(data =>{
            if(!data){

                next()

            }else {
                res.status(401).json({
                    msg: "The phone number already exist"
                })
                
            }
        })
        .catch(err=>{
            res.status(401).json(err)
        })
    }

    static cekUniqueEmail(req, res, next){
        let {email} = req.body
        User.findOne({
           where: {email: email} 
        })
        .then(data =>{
            if(!data){

                next()

            }else {
                res.status(401).json({
                    msg: "Email already exist"
                })
                
            }
        })
        .catch(err=>{
            res.status(401).json(err)
        })

    }

}

module.exports = Validation