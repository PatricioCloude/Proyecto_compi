const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))
/* Agregando el midleware */
    app.use(express.json()) 
/* -----------------------*/
const products = [
    {
        id: 1,
        name: "eduardo",
        price: 3000
    }
]

app.get('/productos',(req,res) =>{
    res.json(products)
})

app.post('/productos',(req,res) =>{
    const new_products = ({...req.body, id: products.length + 1 }) //( copia de los elementos , id : tamaño del vector + 1)
    products.push(new_products)  // agregar los datos
    res.send(new_products) 
})
app.put('/productos',(req,res) =>{
    res.send('Actualizando productos')
})
app.delete('/productos',(req,res) =>{
    res.send('Eliminando productos')
})
app.get('/productos/:id',(req,res) =>{
    console.log(req.params.id)

    const productFoud = products.find(
        (product)  => product.id === parseInt(req.params.id)
    )
/*
    const productFoud = products.find(function(product){ // por cada elemento de la funcion se compara con el elemento
        return product.id ===  parseInt(req.params.id) // parseInte (convirtiendo string a entero)
    })
*/
    if(!productFoud) return res.status(404).json({
        mensaje: "Producto no existe"
    })
    console.log(productFoud)
    res.json(productFoud)
})



app.listen(3000)
console.log(`server on port ${3000}`)