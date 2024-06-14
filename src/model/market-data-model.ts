type Map<T> = {
    [key: string]: T;
};

type AuditFields = {
    createdBy: string;
    createdAt: number;
    updatedAt: number;
}

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

export type ImageInfo = {
    _id: string;
    url: string;
    size: number;
    ownerId: string;
    createdAt: number;
    __v: number;
}

export class ProductInfo {
    _id: string
    name: string
    description: string
    imageUrls: string[]
    images: string[] | ImageInfo[] = []
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
    inventoryManagementOption: boolean
    stockQuantity: number = 0
    weight: number = 0;
    height: number = 0;
    width: number = 0;
    length: number = 0;
    categoryId?: string = undefined;

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
        inventoryManagementOption: boolean
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

export type CartItem = AuditFields & {
    _id: string;
    cartId: string;
    productId: ProductInfo | string;
    quantity: number;
};

export enum Role {
    Buyer = 'buyer',
    Seller = 'seller',
}
export class Category {
    id: string;
    name: string;
    imageUrl: string;
    parent: string = '';
    ancestors: string[] = [];
    isLeaf: boolean = false;

    constructor(
        id: string,
        name: string,
        imageUrl: string
    ) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }
}

export enum InventoryTabName {
    InStock = 'Còn hàng',
    OutOfStock = 'Hết hàng',
    Hidden = 'Đang ẩn'
}

