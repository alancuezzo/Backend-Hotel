const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.authPath = "/api/auth";
    this.usuarioPath = "/api/usuarios";
    this.reservaPath = "/api/reservas";
    this.categoriasPath = "/api/categorias";
  
    this.habitacionesPath = "/api/habitaciones";
    //buscar
    this.buscarPath = "/api/buscar";

    

    this.conectarDB();

    this.middlewares();

    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuarioPath, require("../routes/usuarios"));
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    this.app.use(this.reservaPath, require("../routes/reservas"));
    
    //Ruta de habitacion
    this.app.use(this.habitacionesPath, require("../routes/habitacion"));
    //Reservas
    
    //Buscador
    this.app.use(this.buscarPath, require("../routes/buscar"));
    
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Online", this.port);
    });
  }
}

module.exports = Server;
