var app = new Vue({
    el: "#page",
    data: {
        errors: [],
        input: {
            first_name: '',
            last_name: '',
            phone_number: '',
            date_of_birth:'',
            gender:'',
            email:''
        },
        isSuccess: false,
        isgrey: false,
        islogin : false,
        colorText: {
            color: '#808080'
        }

    },
    methods: {
        addRegistered(){
            this.input.date_of_birth = this.cekDate(this.input.date_of_birth)
            this.input.gender = this.cekgender(this.input.gender)
            let { first_name, last_name, phone_number,date_of_birth,gender,email} = this.input
            if(this.requiredChecking(this.input)){
                axios({
                    url:'http://localhost:3000/users',
                    method:'POST',
                    data: {
                        first_name, 
                        last_name, 
                        phone_number,
                        date_of_birth,
                        gender,
                        email
                    }
                })
                .then(({data})=>{
                    this.isgrey = true
                    this.input = {
                       first_name: '',
                        last_name: '',
                        phone_number: '',
                        date_of_birth:'',
                        gender:'',
                        email:''
                   }
                })
                .catch(error=>{
                    this.errors = []
                    this.errors.push(error.response.data.msg)
                })
               
            }
        },
        requiredChecking(inputData){
            this.errors = []

            for (const key in inputData) {
                if(key !== 'date_of_birth' && key !== "gender" &&  inputData[key] === ''){
                    this.errors.push(`${key} required`)
     
                 }else if(key === 'email' && !this.validateEmail(inputData[key])){
                    this.errors.push('Email format must contain @ and .')
     
                 }else if(key === 'phone_number' && !this.validatePhone(inputData.phone_number)){
                     this.errors.push('Please enter valid Indonesian number')
                 }
            }
           
             if (!this.errors.length) {
                return true;
              }
        },
        validateEmail(email){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        validatePhone(phone){
           let cek = phone.slice(0,2)
           if(cek === '62'){
               return true
           }else {
               return false
           }
        },
        cekDate(date){
            if(date !== ''){
                return date
            }else{
                let date = new Date()
                let month = date.getMonth()+1
                let day = date.getDate()
                let year = date.getFullYear()
                if(month < 10){
                    month = '0' + month
                }if(day.length < 2){
                    day = '0' + day 
                }
                let full = day+"-"+month+"-"+year
                return full
            }

        },
        cekgender(gender){
            if(gender !== ''){
                return gender
            }else {
                return 'none'
            }

        },
        loginPage(){
            this.isgrey = false
            this.input = {
                first_name: '',
                last_name: '',
                phone_number: '',
                date_of_birth:'',
                gender:'',
                email:''
            }
            this.islogin = true
        },
        loginSuccess(){
            this.errors = []
            if(this.input.phone_number === ''){
                this.errors.push(`please enter phone number`)
            }else{
                let {phone_number} = this.input
                axios({
                    url:'http://localhost:3000/users/login',
                    method:'POST',
                    data: {
                       phone_number
                    }
                })
                .then(({data})=>{
                    if(data.status === 200){
                        this.input.phone_number = ''
                        this.islogin = false
                        this.isSuccess = true
                    }else if(data.status === 400){
                        this.errors.push(data.msg)

                    }
                })
                .catch(error=>{
                    this.errors = []
                    this.errors.push(error.response.data.msg)
                })

            }
            
        },

        backToRegister(){
            this.errors = []
            this.isSuccess = false
            this.islogin = false
            this.isgray = false

        }
    }
})