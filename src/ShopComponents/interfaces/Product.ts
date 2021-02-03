import Image from "../interfaces/Image"

interface Product {
    name: string,
    descr: string,
    price: number
    image: Image
}

export default Product;