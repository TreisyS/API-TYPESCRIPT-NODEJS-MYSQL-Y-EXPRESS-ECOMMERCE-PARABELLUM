//modulo principale fros
import {App} from './services/articuloservices'

const puerto = 3000;
//inicializar el programa
async function main()
{
const app = new App(puerto);
await app.listen();
}

main();