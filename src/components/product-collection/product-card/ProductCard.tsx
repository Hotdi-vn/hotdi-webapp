import Image from 'next/image';
import { Space, EnvironmentOutline } from '@/components/common/antd_mobile_client_wrapper';
import clsx from 'clsx';
import Link from 'next/link';
import { ProductInfo } from '@/model/market-data-model';
import Price from '@/components/common/Price';

export enum ProductCardType {
  Normal,
  Large,
  Horizontal
}

export enum CollectionType {
  NoiBatPhanPhat = "NoiBatPhanPhat",
  SanPhamMoiToanh = "SanPhamMoiToanh",
  ChoNeHotDi = "ChoNeHotDi",
  DoTuoiRoiRoi = "DoTuoiRoiRoi",
  DoKhoChanAi = "DoKhoChanAi"
}

//function to format 1000 as 1K, 1000000 as 1M, etc.
export function formatNumber(num: number, precision: number = 1) {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => num >= x.threshold);
  if (found) {
    if (found.threshold == 1) { return num }
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num;
}


export default function ProductCard({ productInfo, shortImage, fill = true, width = 0, height = 0,
  productInfoPadding = false, imageRadius = true, productCardType = ProductCardType.Normal, imageSizes = "33vw", showLocation = true }:
  {
    productInfo: ProductInfo, shortImage?: boolean, fill?: boolean, width?: number, height?: number,
    productInfoPadding?: boolean, imageRadius?: boolean, productCardType?: ProductCardType, imageSizes?: string, showLocation?: boolean
  }) {

  const horizontalCard = productCardType == ProductCardType.Horizontal ? true : false;

  const image = (
    <Image
      src={productInfo.imageUrls.at(0) ?? ''}
      alt={productInfo.name}
      fill={fill}
      width={fill ? 0 : width}
      height={fill ? 0 : height}
      sizes={imageSizes}
      className={clsx({
        ["object-cover rounded-tl-lg rounded-bl-lg"]: horizontalCard,
        ["object-cover rounded-lg"]: imageRadius && !horizontalCard,
        ["object-cover"]: !imageRadius 
      })}
    />
  )

  const imageContainer = (
    <div className={clsx({
      ["relative aspect-[1] w-[100px]"] : horizontalCard,
      ["relative aspect-[4/3]"] : shortImage,
      ["relative aspect-[1]"] : !shortImage && !horizontalCard
    })}>
      {image}
    </div>
  )

  productInfoPadding = horizontalCard ? true : productInfoPadding;

  return (
    <Link href={`/product/${productInfo._id}`}>
      <div className={clsx({
        ["w-[136px] whitespace-normal"]: productCardType == ProductCardType.Normal,
        ["w-[48vw] whitespace-normal"]: productCardType == ProductCardType.Large,
        ["w-[75vw] whitespace-normal bg-white flex rounded-lg"]: productCardType == ProductCardType.Horizontal
      })}>
        {imageContainer}
        <Space direction="vertical" className={clsx({
          ["p-[auto]"]: !productInfoPadding,
          ["px-3 py-2"]: productInfoPadding
        })}>
          <div className={clsx({
          ["text-[#333333] flex overflow-hidden min-h-[35px] mt-2"]: !horizontalCard,
          ["text-[#333333] flex overflow-hidden"]: horizontalCard
        })}>
            {productInfo.name.substring(0, 30)}
            {productInfo.name.length > 30 ? '...' : ''}
          </div>
          <div className={clsx({
            ["flex items-center gap-2"] : horizontalCard,
            ["flex flex-col gap-2"] : !horizontalCard
          })}>
            <Price price={productInfo.price} />
            {horizontalCard && <div className='text-neutral-300'>|</div>}
            <div className="text-xs text-[#333333]">
              Đã bán {formatNumber(productInfo.soldCount)}
            </div>
          </div>
          {
            showLocation ?
              <div className={"flex items-center gap-[0.25em] text-neutral-400 text-[0.75em]"}>
                <EnvironmentOutline />
                <div className="overflow-hidden">{productInfo.location}</div>
              </div>
              :
              undefined
          }
        </Space>
      </div>
    </Link>
  )
}