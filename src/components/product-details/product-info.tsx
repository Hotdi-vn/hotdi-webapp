const ProductInfo = (prop: any) => {
    const { price, name } = prop
    return (
        <div >
            <div className='text-xl text-green-500'>{price}</div>
            <div className='text-sm'>{name}</div>
        </div>
    )
}

export default ProductInfo