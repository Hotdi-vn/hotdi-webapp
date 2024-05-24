import Price from "@/components/common/Price"
import IconComponent from "@/components/common/icon_component"

const ProductInfo = (prop: any) => {
    const { price, name, soldCount } = prop
    return (
        <div className="flex flex-col gap-3 p-3 bg-white">
            <div>
                <Price price={price} />
            </div>
            <div className='text-base'>{name}</div>
            <div className='flex text-sm justify-between'>
                <div>
                    Đã bán {soldCount}
                </div>
                <div>
                    <IconComponent name={'favorite'} />
                </div>
            </div>
        </div>
    )
}

export default ProductInfo