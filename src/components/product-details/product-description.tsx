const ProductDescription = (prop: any) => {
    const { description } = prop
    return (
        <div>
            <div className='text-lg text-black font-semibold m-3'>Chi tiết sản phẩm</div>
            <hr/>
            <div className='text-lg text-black font-semibold m-3'>Mô tả sản phẩm</div>
            <div className='text-sm m-3'>{description}</div>
        </div>
    )
}

export default ProductDescription