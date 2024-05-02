const ProductDescription = (prop: any) => {
    const { description } = prop
    return (
        <div >
            <div className='text-lg text-black font-semibold'>Chi tiết sản phẩm</div>
            <div className='text-sm'>{description}</div>
        </div>
    )
}

export default ProductDescription