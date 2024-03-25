'use client'

import { useState } from "react";
import { ActionSheet, Button, Cascader, Form, ImageUploadItem, ImageUploader, Input, Popup, Switch, TextArea } from "antd-mobile";
import Icon from "../common/icon_component";
import { InventoryStatus, InventoryStatusDisplayValue, ProductInfo, PublishStatus } from "@/model/market-data-model";
import { Action } from "antd-mobile/es/components/action-sheet";
import { FormInstance } from "antd-mobile/es/components/form";
import { sellerCreateProduct, uploadProductImage } from "@/server-actions/product-operation-actions";


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

async function submitForm(form: FormInstance, isDraft: boolean = false) {
    if (isDraft) {
        form.setFieldValue('publishStatus', PublishStatus.Draft);
    } else {
        form.setFieldValue('publishStatus', PublishStatus.Published);
    }

    const uploadItem = form.getFieldValue('imageUrls') as ImageUploadItem[];
    form.setFieldValue('imageUrls', uploadItem.map(item => item.url));
    form.setFieldValue('images', uploadItem.map(item => item.key));
    sellerCreateProduct(form.getFieldsValue());
}

export default function ProductCreation() {
    const [form] = Form.useForm<ProductInfo>();
    const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
    const [inventoryStatusSelection, setInventoryStatusSelection] = useState<boolean>(false);
    const [stockQuantityVisible, setStockQuantityVisible] = useState<boolean>(false);
    const [categorySelection, setCategorySelection] = useState<boolean>(false);
    const [sizeSelection, setSizeSelection] = useState(false);

    const actions: Action[] = [
        {
            text: InventoryStatusDisplayValue[InventoryStatus.InStock], key: InventoryStatus.InStock
        },

        {
            text: InventoryStatusDisplayValue[InventoryStatus.OutOfStock], key: InventoryStatus.OutOfStock
        },
    ]

    const categoryOptions = [
        {
            label: 'Gạo đậu',
            value: 'fbf9d88d-37b6-4ee7-a688-2dde890b33a7'
        },
        {
            label: 'Gạo đậu 2',
            value: '1'
        },
        {
            label: 'Gạo đậu 3',
            value: '65d807fc8c1538860f74a9b4'
        },
    ]

    return (
        <>
            <Form name="createProductForm" form={form} className="body" initialValues={{ inventoryStatus: InventoryStatus.InStock }}>
                <div className=" bg-white h-32 flex justify-center content-center flex-wrap">
                    <Form.Item name='imageUrls'>
                        <ImageUploader
                            value={fileList}
                            onChange={setFileList}
                            upload={uploadImage}
                            maxCount={10}
                            multiple={true}
                        >
                            <div className="flex w-28 h-28 content-center justify-center flex-wrap border"><Icon name='galleryAdd' /></div>

                        </ImageUploader>
                    </Form.Item>
                </div>

                <Form.Item name='images' hidden />

                <Form.Item name='publishStatus' hidden />

                <Form.Item name='name' label='Tên sản phẩm'>
                    <Input placeholder='Nhập tên sản phẩm' maxLength={120} />
                </Form.Item>

                <Form.Item name='description' label='Mô tả sản phẩm'>
                    <TextArea placeholder='Nhập mô tả sản phẩm' maxLength={3000} showCount rows={5} />
                </Form.Item>

                <Form.Item label='Kích thước'
                    layout='horizontal' childElementPosition='right' arrow
                    onClick={() => setSizeSelection(true)}
                >
                </Form.Item>

                <Popup
                    position='right'
                    visible={sizeSelection}
                    showCloseButton
                    onClose={() => {
                        setSizeSelection(false)
                    }}
                >
                    <div style={{ padding: '40px 20px 20px', width: '100vw' }}>
                        <Form.Item name='weight' label='Cân nặng'>
                            <Input placeholder='100' type="number" />
                        </Form.Item>
                        <Form.Item name='height' label='Chiều cao'>
                            <Input placeholder='100' type="number" />
                        </Form.Item>
                        <Form.Item name='length' label='Dài'>
                            <Input placeholder='100' type="number" />
                        </Form.Item>
                        <Form.Item name='width' label='Rộng'>
                            <Input placeholder='100' type="number" />
                        </Form.Item>
                    </div>
                </Popup>

                <Form.Item name='price' label='Giá'>
                    <Input placeholder='Ví dụ 100.000' type="number" />
                </Form.Item>

                <Form.Item initialValue={false} name='inventoryManagementOption' label='Quản lý tồn kho' layout='horizontal' childElementPosition='right'>
                    <Switch onChange={setStockQuantityVisible} />
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

                <Form.Item name='stockQuantity' label='Số lượng' layout='horizontal' childElementPosition='right' hidden={!stockQuantityVisible}>
                    <Input placeholder='0' type="number" />
                </Form.Item>


                <Form.Item name='categoryId' hidden />

                <Cascader
                    options={categoryOptions}
                    visible={categorySelection}
                    onClose={() => {
                        setCategorySelection(false)
                    }}
                    cancelText='Hủy'
                    confirmText='Lưu'
                    placeholder='Chưa chọn'
                    title='Chọn danh mục'
                    onConfirm={(values) => form.setFieldValue('categoryId', values[values.length - 1])}
                >
                    {(items) =>
                        <Form.Item label='Ngành hàng' layout='horizontal' childElementPosition='right' arrow
                            shouldUpdate={(prevValues, curValues) => prevValues.inventoryStatus !== curValues.inventoryStatus}
                            onClick={() => setCategorySelection(true)}
                        >
                            {items[items.length - 1]?.label ?? 'Chọn ngành hàng'}
                        </Form.Item>}
                </Cascader>



            </Form >
            <div className='flex flex-row bottom p-2 gap-x-2'>
                <Button className="basis-1/2" color='primary' fill="outline" onClick={() => submitForm(form, true)}>Lưu</Button>
                <Button className="basis-1/2" color='primary' onClick={() => submitForm(form)}>Đăng bán</Button>
            </div>
        </>
    );
}
