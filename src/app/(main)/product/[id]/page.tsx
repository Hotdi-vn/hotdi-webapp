import CarouselProduct from "@/components/product-details/carousel-product"
import ProductInfo from "@/components/product-details/product-info"
import UserCard from "@/components/product-details/user-card"
import ProductDescription from "@/components/product-details/product-description"
import { getProductById } from "@/api-services/product-details"
import { getUserInfoById } from "@/api-services/auth-service"

export default async function ProductDetails({
    params,
  }: {
    params: { id: string }
  }) {
    const productInfo = await getProductById(params.id)
    const userInfo = await getUserInfoById(productInfo.data.createdBy)
    return (
        <>
            <CarouselProduct imageUrls={productInfo.data.imageUrls}/>
            <div className="m-6">
              <ProductInfo name={productInfo.data.name} price={productInfo.data.price}/>
              <UserCard userInfo={userInfo}/>
              <ProductDescription description={productInfo.data.description}/>
            </div>
        </>
    )
}