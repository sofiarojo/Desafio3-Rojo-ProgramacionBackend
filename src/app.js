//Desafio de la Clase 4
import express from 'express';
import ProductManager from './ProductManager.js';


const app = express();

const productManager = new ProductManager('../products.json');

app.use(express.json());

//Endpoint para obtener todos los productos con límite opcional
app.get('/products', async (req, res) => {
    try {
        const {limit} = req.query;
        const products = await productManager.getProducts();

        if(limit) {
            const limitedProducts = products.slice(0, parseInt(limit));
            res.json({ products: limitedProducts });
        }else {
            res.json({ products });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos '});
    }
});

//Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductsById(pid);

        if (!product) {
            return res.status(400).json({ message: "Product not found with the id" });
        }
        res.status(200).json({ message: "Product found", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.listen(8080, () => {
    console.log('¡Escuchando servidor 8080!');
});