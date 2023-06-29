const mongoose = require("mongoose");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/autenuser');
    console.log("Conectou com o mogoose");
}

main().catch((err) => {
    console.log(err)
})

module.exports = mongoose