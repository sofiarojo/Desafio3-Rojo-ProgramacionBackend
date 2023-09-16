import { promises as fsPromises } from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            const info = await fsPromises.readFile(this.path, 'utf-8');
            return JSON.parse(info);
        } catch (error) {
        return error;
        }
    }

    async addProduct(productData) {
        try {
            const products = await this.getProducts();
            let id = 1;
            if (products.length > 0) {
            id = Math.max(...products.map((product) => product.id)) + 1;
        }

        const product = { id, ...productData };
        products.push(product);
        await fsPromises.writeFile(this.path, JSON.stringify(products));
        return product;
        } catch (error) {
            return error;
        }
    };

    async getProductsById(productId) {
        try {
            const products = await this.getProducts();
            const product = products.find((p) => p.id === Number(productId));
            if (product) {
            return product;
            } else {
            return "No product";
            }
            } catch (error) {
                return error;
        }
    }

  async updateProduct(productId, updateData) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((p) => p.id === productId);
      if (index !== -1) {
        products[index] = { ...products[index], ...updateData };
        await fsPromises.writeFile(this.path, JSON.stringify(products));
        return products[index];
      } else {
        return "Product not found";
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(productId) {
    try {
      const products = await this.getProducts();
      const newProducts = products.filter((p) => p.id !== productId);
      await fsPromises.writeFile(this.path, JSON.stringify(newProducts));
    } catch (error) {
      return error;
    }
  }
}

export default ProductManager;
