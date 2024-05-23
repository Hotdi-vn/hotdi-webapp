'use client'

import { Divider, Ellipsis } from "antd-mobile"
import ExpandableContent from "../common/ExpandableContent"

const ProductDescription = (prop: any) => {
    const { description } = prop
    return (
        <div className="flex flex-col p-3 gap-3">
            <div className='text-base font-medium'>Mô Tả Sản Phẩm</div>
            <div className='text-sm font-normal'>
                <ExpandableContent content={description} rows={5} />
            </div>
        </div>
    )
}

export default ProductDescription