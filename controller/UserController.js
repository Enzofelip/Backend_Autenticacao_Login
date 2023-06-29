const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getToken = require("../helps/get-token")


// helps
const createUserToken = require("../helps/create-user-token");

module.exports = class UserController{


    static async register(req, res){
        const {name, email, password,confipassword, phone} = req.body;

        if(!name){
            res.status(422).json({message: "O nome é obrigatorio"})
            return
        }
        if(!email){
            res.status(422).json({message: "O email é obrigatório"})
            return
        }
        if(!password){
            res.status(422).json({message: "A senha é obrigatória"})
            return
        }
        if(!confipassword){
            res.status(422).json({message: "A confirmação de senha é obrigatória"})
            return
        }
        if(confipassword !== password){
            res.status(422).json({message: "A senha está diferente"})
            return
        }
        if(!phone){
            res.status(422).json({message: "O telefone é obrigatório"})
            return
        }

        const userEmail = await User.findOne({email: email})

        if(userEmail){
            res.status(422).json({message: "O email já está cadastrado"})
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: passwordHash,
            phone
        })
    
        try{
          const newUser = await user.save()
          res.status(200).json({message: "Usuário registrado com sucesso!!", newUser})
        }catch(err){
            res.status(500).json({message: err});
            return
        }

    }

    static async login(req, res){
        const {email, password} = req.body

        if(!email){
            res.status(422).json({message: "O email é obrigatório"})
            return
        }
        if(!password){
            res.status(422).json({message: "A senha é obrigatoria"})
            return
        }

        const user = await User.findOne({email: email});

        if(!user){
            res.status(422).json({message: "Por favor utilize outro email"});
            return
        }

        //Comparando a senha do banco com a senha enviada pelo usuario
        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            res.status(422).json({message: "Senha inválida"});
            return
        }

        await createUserToken(user, req, res);
    }

    static async checkUser(req, res){

        let userCheck;

        console.log(req.headers.authorization)

        if(req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token, 'meusecrete')

            userCheck = await User.findById(decoded.id)

            userCheck.password = undefined
           
        }else{
            userCheck = null
        }

        console.log(userCheck)
       res.status(200).send(userCheck)
    }
}