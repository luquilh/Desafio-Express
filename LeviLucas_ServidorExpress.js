const Contenedor = require('./Contenedores.js')
const express = require ('express')

const PORT = 8080;


const productos = new Contenedor('./productos.txt');

const app = express();


/*     ///////////// En este caso se hace con .then() y no con async await /////////////////    
app.get('/productos', (req, res) => {
    productos.getAll().then( (catalogo) => {
        res.json(catalogo)
    })
})
*/

////////    En este caso se hace con async await ///////////////
async function getProducts(req,res){
    const x = await productos.getAll();
    res.send(x);
    

}
app.get('/productos', getProducts);

app.get('/productoRandom', (req,res) => {
    productos.getAll().then( catalogo => {
        const index = Math.floor(Math.random()*catalogo.length);
        res.send(catalogo[index]); 
    })
})

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en puerto ${server.address().port}`)
})
server.on('error', (error) => { console.log(`Error en el servidor: ${error}`)});


