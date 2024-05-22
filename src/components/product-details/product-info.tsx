const ProductInfo = (prop: any) => {
    const { price, name, soldCount } = prop
    return (
        <div >
            <div className='text-xl text-green-500 font-semibold my-6' style={{color: "#3A6F05"}}> đ {price}</div>
            <div className='text-sm my-6'>{name}</div>
            <div className='text-sm my-6'>Đã bán {soldCount}</div>
        </div>
    )
}

export default ProductInfo