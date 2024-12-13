import axios from 'axios'

export const productData = async () => {
    const product = await axios.get('https://fakestoreapi.com/products')
    return product.data
}
