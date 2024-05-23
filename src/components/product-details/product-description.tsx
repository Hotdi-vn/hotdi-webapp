'use client'

import { Divider, Ellipsis } from "antd-mobile"
import ExpandableContent from "../common/ExpandableContent"

const ProductDescription = (prop: any) => {
    const { description } = prop
    return (
        <div className="bg-white">
            <div className='text-lg text-black font-semibold'>Mô Tả Sản Phẩm</div>
            <div className='text-sm'>
                <ExpandableContent content={description} rows={5} />
            </div>
        </div>
    )
}

export default ProductDescription