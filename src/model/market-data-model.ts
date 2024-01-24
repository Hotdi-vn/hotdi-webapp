export enum CollectionType {
    NoiBatPhanPhat = "NoiBatPhanPhat",
    SanPhamMoiToanh = "SanPhamMoiToanh",
    ChoNeHotDi = "ChoNeHotDi",
    DoTuoiRoiRoi = "DoTuoiRoiRoi",
    DoKhoChanAi = "DoKhoChanAi"
}

export enum InventoryStatus {
    InStock = 'Còn hàng',
    OutOfStock = 'Hết hàng',
    Hidden = 'Đang ẩn'
}

export class ProductInfo {
    _id: string
    name: string
    description: string
    imageUrls: string[]
    price: number
    location: string
    colectionType: CollectionType
    soldCount: number
    createdBy: string
    createdAt: number
    updatedBy: string
    updatedAt: number
    inventoryStatus: InventoryStatus

    constructor(
        id: string,
        name: string,
        description: string,
        imageUrls: string[],
        price: number,
        location: string,
        colectionType: CollectionType,
        soldCount: number,
        createdBy: string,
        createdAt: number,
        updatedBy: string,
        updatedAt: number,
        inventoryStatus: InventoryStatus
    ) {
        this._id = id
        this.name = name
        this.description = description
        this.imageUrls = imageUrls
        this.price = price
        this.location = location
        this.colectionType = colectionType
        this.soldCount = soldCount
        this.createdBy = createdBy
        this.createdAt = createdAt
        this.updatedBy = updatedBy
        this.updatedAt = updatedAt
        this.inventoryStatus = inventoryStatus
    }
}