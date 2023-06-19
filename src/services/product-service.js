const { ProductRepository } = require('../repositories/product-repository');
const { formatData } = require('../utils/index');
const DefinedError = require('../utils/error-handler');

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    createProduct = async (productInputs) => {
        try {
            const product = await this.productRepository.createProduct(productInputs);
            return formatData(product);
        } catch (err) {
            if (err instanceof DefinedError) {
                throw err;
            } else {
                throw new DefinedError("Error creating product", 500);
            }
        }
    }
}