import express, {Application} from 'express'
import morgan from 'morgan'

//Routes
import indexrouter from '../routes/index.routes'
import productorouter from '../routes/producto.routes'
import usuariorouter from '../routes/usuario.routes'
//const PORT = 3000;





export class App {
    private app: Application;
constructor(private port: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
}
settings()
{
    this.app.set('port', this.port || process.env.PORT || 3000);

}
middlewares()
{
    this.app.use(morgan('dev'));
    this.app.use(express.json());
}
routes() {
    this.app.use(indexrouter);  // Aquí montamos las rutas
this.app.use('/productos', productorouter);
this.app.use('/usuarios', usuariorouter);
}

async listen()
{
    
await this.app.listen(this.app.get('port'));
console.log('Servidor en el puerto: ', this.app.get('port'));


}
}