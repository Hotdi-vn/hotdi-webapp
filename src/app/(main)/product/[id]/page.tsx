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
import ShopHighlightedProducts from "@/components/product-collection/ShopHighlightedProducts"
import AddToCartButton from "@/components/shopping-cart/AddToCartButton"

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
      <div className="top bg-transparent z-10">
        <NavBar backArrow={<BackButton icon={<Icon name="backBgGrey" />} />} right={icons} />
      </div>
      <div className="bg-white body">
        <CarouselProduct imageUrls={productInfo.data.imageUrls} />
        <ProductInfo name={productInfo.data.name} price={productInfo.data.price} soldCount={productInfo.data.soldCount} />
        <hr className="bg-slate-200	h-1" />
        <UserCard userProfile={userInfo} />
        <ShopHighlightedProducts shopId={productInfo.data.createdBy} />
        <hr className="bg-slate-200	h-1" />
        <ProductDescription description={productInfo.data.description} />
      </div >
      <div className="bottom flex justify-center items-center">
        <div className="flex basis-1/6 justify-center">
          <Button shape="rectangular" size="large">
            <Icon name={'messageActive'} />
          </Button>
        </div>
        <div className="basis-2/6">
          <Button color="success" shape="rectangular" size="large" block>
            Mua ngay
          </Button>
        </div>
        <div className="basis-3/6">
          <AddToCartButton productId={productInfo.data._id} />
        </div>
      </div>
    </>

  )
}