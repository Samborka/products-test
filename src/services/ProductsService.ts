class ProductsService {
  async getProducts() {
    const response =  await fetch('/data/products.json')
    const data = await response.json();

    return data;
  }
}

export default new ProductsService();