import { productService } from '@/services/product.service'
import FeaturedProducts from './FeaturedProducts'

export default async function FeaturedProductsSection() {
    const data = await productService.getProducts({ pageSize: 12 })
    return <FeaturedProducts initialProducts={data.items} />
}
