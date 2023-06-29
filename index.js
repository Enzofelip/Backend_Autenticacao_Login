const express = require("express");
const app = express();
const cors = require("cors");



// informaçoes enviadas do front
app.use(express.json())

// Configuração da conecxão com o front e o back
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))

const UserRoutes = require("./router/Router");

app.use("/users", UserRoutes);


app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
})

