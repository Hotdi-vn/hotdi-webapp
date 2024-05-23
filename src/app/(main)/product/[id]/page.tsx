import CarouselProduct from "@/components/product-details/carousel-product"
import ProductInfo from "@/components/product-details/product-info"
import UserCard from "@/components/product-details/user-card"
import ProductDescription from "@/components/product-details/product-description"
import { getProductById } from "@/api-services/product-details"
import { getUserInfoById } from "@/api-services/auth-service"
import { Button, NavBar } from "@/components/common/antd_mobile_client_wrapper"
import Icon from "@/components/common/icon_component";
import { BackButton } from "@/components/button/BackButton"
import ShoppingCart from "@/components/shopping-cart/ShoppingCart"

export default async function ProductDetails({
  params,
}: {
  params: { id: string }
}) {
  const productInfo = await getProductById(params.id)
  const userInfo = await getUserInfoById(productInfo.data.createdBy)

  const icons = <div className="flex flex-row gap-2 items-baseline">
    <div><Icon name='shareBgGrey' /></div>
    <div><ShoppingCart icon={<Icon name="shoppingBagBgGrey" />} /></div>
    <div><Icon name='moreBgGrey' /></div>
  </div>;
  return (
    <>
      <div className="sticky top-0 bg-transparent z-10">
        <NavBar backArrow={<BackButton icon={<Icon name="backBgGrey" />} />} right={icons} />
      </div>
      <div className="flex flex-col top-0 relative">
        <CarouselProduct imageUrls={productInfo.data.imageUrls} />
        <ProductInfo name={productInfo.data.name} price={productInfo.data.price} soldCount={productInfo.data.soldCount} />
        <hr className="bg-slate-200	h-1" />
        <UserCard userProfile={userInfo} />
        <hr className="bg-slate-200	h-1" />
        <ProductDescription description={productInfo.data.description} />
      </div >
    </>

  )
}