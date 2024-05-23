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
        <div className="bg-white">
            <button
              className="h-8 w-8 absolute top-4 left-4"
              type="button">
                <img src={"/icons/arrow_left.svg"} alt="Back"/>
            </button> 
            <CarouselProduct imageUrls={productInfo.data.imageUrls}/>
            <div className="m-3">
              <ProductInfo name={productInfo.data.name} price={productInfo.data.price} soldCount={productInfo.data.soldCount}/>
            </div>
            <hr className="bg-slate-200	h-1"/>
            <div className="m-3">
            <UserCard userInfo={userInfo}/>
            </div>
            <hr className="bg-slate-200	h-1"/>
            <ProductDescription description={productInfo.data.description}/>
        </div>
    )
}