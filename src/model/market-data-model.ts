type Map<T> = {
    [key: string]: T;
};

export enum CollectionType {
    NoiBatPhanPhat = "NoiBatPhanPhat",
    SanPhamMoiToanh = "SanPhamMoiToanh",
    ChoNeHotDi = "ChoNeHotDi",
    DoTuoiRoiRoi = "DoTuoiRoiRoi",
    DoKhoChanAi = "DoKhoChanAi"
}

export enum InventoryStatus {
    InStock = 'InStock',
    OutOfStock = 'OutOfStock',
}

export const InventoryStatusDisplayValue: Map<string> = {
    InStock: 'Còn hàng',
    OutOfStock: 'Hết hàng',
}

export enum PublishStatus {
    Draft = 'Draft',
    Published = 'Published',
    Hidden = 'Hidden',
}

export const PublishStatusDisplayValue: Map<string> = {
    Draft: 'Bản nháp',
    Published: 'Đang đăng bán',
    Hidden: 'Đang ẩn',
}

export class ProductInfo {
    _id: string
    name: string
    description: string
    imageUrls: string[]
    images: string[] = []
    price: number
    location: string
    colectionType: CollectionType
    soldCount: number
    createdBy: string
    createdAt: number
    updatedBy: string
    updatedAt: number
    inventoryStatus: InventoryStatus
    publishStatus: PublishStatus
    inventoryManagementOption: string
    weight: number = 0;
    height: number = 0;
    width: number = 0;
    length: number = 0;

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
        inventoryStatus: InventoryStatus,
        publishStatus: PublishStatus,
        inventoryManagementOption: string
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
        this.publishStatus = publishStatus
        this.inventoryManagementOption = inventoryManagementOption
    }
}