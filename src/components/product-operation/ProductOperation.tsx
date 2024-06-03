'use client'

import { useEffect, useState } from "react";
import { ActionSheet, Button, Cascader, CascaderOption, Divider, Form, ImageUploadItem, ImageUploader, Popup, Switch, TextArea } from "antd-mobile";
import Icon from "../common/icon_component";
import { InventoryStatus, InventoryStatusDisplayValue, ProductInfo, PublishStatus, ImageInfo } from "@/model/market-data-model";
import { Action } from "antd-mobile/es/components/action-sheet";
import { sellerCreateProduct, sellerUpdateProduct, uploadProductImage } from "@/server-actions/product-operation-actions";
import FormattedNumberInput from "../common/FormattedNumberInput";
import clsx from "clsx";
import { OperationMode } from "@/constants/common-contants";
import { Category } from "@/api-services/market-service";

export default function ProductOperation(
    {
        productInfo,
        categories,
        mode = OperationMode.Create
    }:
        {
            productInfo?: ProductInfo,
            categories: Category[]
            mode?: OperationMode
        }
) {
    const defaultUploadedImages = productInfo?.images.map(image => ({ key: (image as ImageInfo)._id, url: (image as ImageInfo).url })) ?? [];

    const [form] = Form.useForm<ProductInfo>();
    const [fileList, setFileList] = useState<ImageUploadItem[]>(defaultUploadedImages);
    const [inventoryStatusSelection, setInventoryStatusSelection] = useState<boolean>(false);
    const [stockQuantityVisible, setStockQuantityVisible] = useState<boolean>(productInfo?.inventoryManagementOption ?? false);
    const [categorySelection, setCategorySelection] = useState<boolean>(false);
    const [sizeSelection, setSizeSelection] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

    type CascaderOptionExtend = CascaderOption & { isLeaf?: boolean };
    const categoryOptions = buildCategoryOptions(categories);
    const productCategory = productInfo ? categories.find(cate => productInfo.categoryId === cate._id) : undefined;
    const defaultCategory = [...(productCategory?.ancestors ?? []), productCategory?._id ?? ''];

    function populateProductInfo() {
        if (productInfo && OperationMode.Create !== mode) {
            form.setFieldsValue(productInfo);
        }
    }

    const actions: Action[] = [
        {
            text: InventoryStatusDisplayValue[InventoryStatus.InStock], key: InventoryStatus.InStock
        },

        {
            text: InventoryStatusDisplayValue[InventoryStatus.OutOfStock], key: InventoryStatus.OutOfStock
        },
    ]

    async function uploadImage(file: File): Promise<ImageUploadItem> {
        const data = new FormData();
        data.append('file', file);
        const uploadedFile = await uploadProductImage(data);
        if (uploadedFile == null) {
            return { url: '' };
        }
        return {
            key: uploadedFile.fileId,
            url: uploadedFile.fileUrl,
        }
    }

    async function submitForm(isDraft: boolean = false): Promise<void> {
        if (isDraft) {
            form.setFieldValue('publishStatus', PublishStatus.Draft);
        } else {
            form.setFieldValue('publishStatus', PublishStatus.Published);
        }

        const uploadedImages = form.getFieldValue('uploadedImages') as ImageUploadItem[];
        if (uploadedImages?.length > 0) {
            form.setFieldValue('images', uploadedImages.map(item => item.key));
        }

        form.submit();
    }

    function buildCategoryOptions(categories: Category[]): CascaderOptionExtend[] {
        const rootCategories = categories.filter(cat => cat.parent === '0');
        const childCategories = categories.filter(cat => cat.parent !== '0');
        const rootOptions = rootCategories.map<CascaderOptionExtend>(category => ({
            value: category._id,
            label: category.name,
            isLeaf: category.isLeaf,
            children: category.isLeaf ? undefined : buildChildrenOptions(category, childCategories)
        }));
        return rootOptions;
    }

    function buildChildrenOptions(parentCategory: Category, categories: Category[]): CascaderOptionExtend[] | undefined {
        const childCategories = categories.filter(cat => cat.parent === parentCategory._id);
        const remainingCategories = categories.filter(cat => cat.parent != parentCategory._id);
        const children = childCategories.map<CascaderOptionExtend>(cat => ({
            value: cat._id,
            label: cat.name,
            isLeaf: cat.isLeaf,
            children: cat.isLeaf ? undefined : buildChildrenOptions(cat, remainingCategories)
        }));
        return children;
    }

    useEffect(() => {
        populateProductInfo();
    }, []);

    const checkNumber = (rule: any, value: number) => {
        if (value >= rule.min && value <= rule.max) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(rule.message));
    }

    const checkCategory = (rule: any, value: string) => {
        if (form.getFieldValue('categoryId')) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(rule.message));
    }

    const checkSize = (rule: any, value: number) => {
        if (form.getFieldValue('weight') && form.getFieldValue('height')
            && form.getFieldValue('width') && form.getFieldValue('length')) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(rule.message));
    }

    return (
        <>
            <Form
                onFinish={(productInfo) => {
                    setFormSubmitting(true);
                    if (mode == OperationMode.Create) {
                        sellerCreateProduct(productInfo);
                    } else if (mode == OperationMode.Edit) {
                        sellerUpdateProduct(productInfo);
                    }
                }}
                requiredMarkStyle='none'
                onFinishFailed={(error) => console.log(error)}
                name="createProductForm" form={form} className="body" initialValues={{ inventoryStatus: InventoryStatus.InStock }}>
                <div className=" bg-white h-32 flex justify-center content-center flex-wrap">
                    <Form.Item initialValue={defaultUploadedImages} name='uploadedImages' rules={[{ required: true, message: 'Vui lòng tải lên hình ảnh sản phẩm' }]}>
                        <ImageUploader
                            style={{ '--cell-size': '108px' }}
                            value={fileList}
                            onChange={setFileList}
                            upload={uploadImage}
                            maxCount={10}
                            multiple={true}
                        >
                            <div className={clsx("flex flex-col h-28 content-center f-center align-middle flex-wrap",
                                {
                                    ["w-screen"]: fileList.length === 0,
                                    ["w-28 border"]: fileList.length > 0
                                }
                            )}>
                                <div className="self-center">
                                    <Icon name='galleryAdd' />
                                </div>
                                <div className={clsx(
                                    { ["hidden"]: fileList.length > 0 }
                                )
                                }>
                                    <label className="adm-form-item-label">Thêm hình ảnh sản phẩm</label>
                                </div>
                            </div>

                        </ImageUploader>
                    </Form.Item>
                </div>
                <Form.Item name='_id' initialValue={productInfo?._id} hidden />
                <Form.Item name='images' hidden />

                <Form.Item initialValue={productInfo?.publishStatus} name='publishStatus' hidden />

                <Form.Item name='name' label='Tên sản phẩm' rules={[{ required: true, max: 120, message: 'Vui lòng nhập tên sản phẩm' }]}>
                    <TextArea placeholder='Nhập tên sản phẩm' maxLength={120} showCount rows={1} />
                </Form.Item>

                <Form.Item name='description' label='Mô tả sản phẩm' rules={[{ required: true, max: 5000, message: 'Vui lòng nhập mô tả sản phẩm' }]}>
                    <TextArea placeholder='Nhập mô tả sản phẩm' maxLength={5000} showCount rows={5} />
                </Form.Item>

                <Form.Item label='Kích thước' name='size' rules={[{ message: 'Vui lòng nhập kích thước', validator: checkSize }]}
                    layout='horizontal' childElementPosition='right' arrow
                    onClick={() => setSizeSelection(true)}
                >
                </Form.Item>

                <Popup
                    position='right'
                    visible={sizeSelection}
                    showCloseButton
                    forceRender
                    onClose={() => {
                        setSizeSelection(false)
                    }}
                >
                    <div style={{ padding: '40px 20px 20px', width: '100vw' }}>
                        <Form.Item initialValue={productInfo?.weight} name='weight' label='Cân nặng' layout='horizontal' childElementPosition='right'
                            rules={[{ required: true, message: 'Vui lòng nhập cân nặng' },
                            { type: 'number', min: 0, max: 99999, message: 'Cân nặng nằm trong khoảng từ 0 đến 99.999', validator: checkNumber }]}
                            style={{ '--align-items': 'baseline' }}
                        >
                            <FormattedNumberInput isFloat placeholder="0" suffix='kg' />
                        </Form.Item>

                        <Form.Item initialValue={productInfo?.height} name='height' label='Chiều cao' layout='horizontal' childElementPosition='right'
                            rules={[{ required: true, message: 'Vui lòng nhập chiều cao' },
                            { type: 'number', min: 0, max: 99999, message: 'Chiều cao nằm trong khoảng từ 0 đến 99.999', validator: checkNumber }]}
                            style={{ '--align-items': 'baseline' }}
                        >
                            <FormattedNumberInput isFloat placeholder="0" suffix='cm' />
                        </Form.Item>
                        <Form.Item initialValue={productInfo?.length} name='length' label='Chiều dài' layout='horizontal' childElementPosition='right'
                            rules={[{ required: true, message: 'Vui lòng nhập chiều dài' },
                            { type: 'number', min: 0, max: 99999, message: 'Chiều dài nằm trong khoảng từ 0 đến 99.999', validator: checkNumber }]}
                            style={{ '--align-items': 'baseline' }}
                        >
                            <FormattedNumberInput isFloat placeholder="0" suffix='cm' />
                        </Form.Item>
                        <Form.Item initialValue={productInfo?.width} name='width' label='Chiều rộng' layout='horizontal' childElementPosition='right'
                            rules={[{ required: true, message: 'Vui lòng nhập chiều rộng' },
                            { type: 'number', min: 0, max: 99999, message: 'Chiều rộng nằm trong khoảng từ 0 đến 99.999', validator: checkNumber }]}
                            style={{ '--align-items': 'baseline' }}
                        >
                            <FormattedNumberInput isFloat placeholder="0" suffix='cm' />
                        </Form.Item>
                        <Divider />
                        <Button block color="primary" onClick={() => setSizeSelection(false)}>Lưu</Button>
                    </div>
                </Popup>

                <Form.Item initialValue={productInfo?.price} name='price' label='Giá' rules={[{ required: true, message: 'Vui lòng nhập giá' },
                { type: 'number', min: 1, max: 999999999, message: 'Giá nằm trong khoảng từ 1 đến 999.999.999', validator: checkNumber }]}>
                    <FormattedNumberInput placeholder="Ví dụ 100.000" prefix={'đ'} textAlign="left" formatImmediately />
                </Form.Item>

                <Form.Item initialValue={productInfo?.inventoryManagementOption} name='inventoryManagementOption' label='Quản lý tồn kho' layout='horizontal' childElementPosition='right'>
                    <Switch onChange={setStockQuantityVisible} defaultChecked={productInfo?.inventoryManagementOption} />
                </Form.Item>

                <Form.Item name='inventoryStatus' hidden />

                <Form.Item label='Trạng thái kho'
                    layout='horizontal' childElementPosition='right' hidden={stockQuantityVisible} arrow
                    shouldUpdate={(prevValues, curValues) => prevValues.inventoryStatus !== curValues.inventoryStatus}
                    onClick={() => setInventoryStatusSelection(true)}
                >
                    {({ getFieldValue }) => InventoryStatusDisplayValue[getFieldValue('inventoryStatus')]}
                </Form.Item>

                <ActionSheet
                    visible={inventoryStatusSelection}
                    actions={actions}
                    onClose={() => setInventoryStatusSelection(false)}
                    closeOnAction
                    onAction={(action) => form.setFieldValue('inventoryStatus', action.key)}
                />

                <Form.Item initialValue={productInfo?.stockQuantity} name='stockQuantity' label='Số lượng' layout='horizontal' childElementPosition='right' hidden={!stockQuantityVisible}
                    rules={[{ type: 'number', min: 0, max: 999999, message: 'Số lượng nằm trong khoảng từ 0 đến 999.999', validator: checkNumber }]}>
                    <FormattedNumberInput placeholder="0" formatImmediately />
                </Form.Item>

                <Cascader
                    defaultValue={defaultCategory}
                    options={categoryOptions}
                    visible={categorySelection}
                    onClose={() => {
                        setCategorySelection(false)
                    }}
                    cancelText='Hủy'
                    confirmText='Lưu'
                    placeholder='Chưa chọn'
                    title='Chọn danh mục'
                    onConfirm={(values) => {
                        form.setFieldValue('categoryId', values[values.length - 1]);
                        form.validateFields(['category']);
                    }}
                >
                    {(items) =>
                        <Form.Item label='Ngành hàng' name='category' rules={[{ message: 'Vui lòng chọn ngành hàng', validator: checkCategory }]}
                            layout='horizontal' childElementPosition='right' arrow
                            shouldUpdate={(prevValues, curValues) => prevValues.inventoryStatus !== curValues.inventoryStatus}
                            onClick={() => setCategorySelection(true)}
                        >
                            {items[items.length - 1]?.label ?? 'Chọn ngành hàng'}
                        </Form.Item>}
                </Cascader>

                <Form.Item name='categoryId' hidden rules={[{ required: true }]} />
            </Form >
            <div className='flex flex-row bottom p-2 gap-x-2'>
                <Button type="submit" loading={formSubmitting} className="basis-1/2" color='primary' fill="outline" onClick={() => submitForm(true)}>Lưu</Button>
                <Button type="submit" loading={formSubmitting} className="basis-1/2" color='primary' onClick={() => submitForm()}>{productInfo ? 'Cập nhật' : 'Đăng bán'}</Button>
            </div>
        </>
    );
}
