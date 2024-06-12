'use client'

import { useState, useTransition } from "react";
import { ActionSheet, Button, Form, NavBar, Switch } from "antd-mobile";
import { InventoryStatus, InventoryStatusDisplayValue, ProductInfo } from "@/model/market-data-model";
import { Action } from "antd-mobile/es/components/action-sheet";
import { sellerUpdateProductInventory } from "@/server-actions/product-operation-actions";
import FormattedNumberInput from "../common/FormattedNumberInput";
import { FormInstance } from "antd-mobile/es/components/form";
import { BackButton } from "../button/BackButton";
import { showError, showSuccess } from "@/utils/message-utils";

export default function ProductInventoryUpdate(
    {
        productInfo,
    }:
        {
            productInfo: ProductInfo
        }
) {
    const [form] = Form.useForm<ProductInfo>();
    const [inventoryStatusSelection, setInventoryStatusSelection] = useState<boolean>(false);
    const [stockQuantityVisible, setStockQuantityVisible] = useState<boolean>(productInfo?.inventoryManagementOption ?? false);
    const [isFieldsTounch, setIsFieldsTounch] = useState<boolean>(form.isFieldsTouched());

    const actions: Action[] = [
        {
            text: InventoryStatusDisplayValue[InventoryStatus.InStock], key: InventoryStatus.InStock
        },

        {
            text: InventoryStatusDisplayValue[InventoryStatus.OutOfStock], key: InventoryStatus.OutOfStock
        },
    ]

    const checkNumber = (rule: any, value: number) => {
        if (value >= rule.min && value <= rule.max) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(rule.message));
    }

    const navBar =
        <NavBar backArrow={<BackButton redirectPath="/seller/shop/product" isConfirmedPrompt={isFieldsTounch} />} >
            <div className="text-xl text-left font-normal">Cập nhật tồn kho</div>
        </NavBar>;

    return (
        <>
            <div className='top'>{navBar}</div>
            <Form
                onFinish={async (productInfo) => {
                    try {
                        await sellerUpdateProductInventory(productInfo);
                        showSuccess('Cập nhật kho thành công');
                    } catch (error) {
                        showError(error);
                    }
                }}
                requiredMarkStyle='none'
                onFinishFailed={
                    (error) => {
                        console.log(error)
                    }
                }
                onFieldsChange={() => {
                    if (!isFieldsTounch) {
                        setIsFieldsTounch(true);
                    }
                }}
                name="createProductForm" form={form} className="body" initialValues={{ inventoryStatus: InventoryStatus.InStock }}>
                <Form.Item name='_id' initialValue={productInfo._id} hidden />

                <Form.Item initialValue={productInfo.publishStatus} name='publishStatus' hidden />

                <Form.Item initialValue={productInfo.inventoryManagementOption} name='inventoryManagementOption' label='Quản lý tồn kho' layout='horizontal' childElementPosition='right'>
                    <Switch onChange={setStockQuantityVisible} defaultChecked={productInfo.inventoryManagementOption} />
                </Form.Item>

                <Form.Item name='inventoryStatus' initialValue={productInfo.inventoryStatus} hidden />

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
                    onAction={(action) => {
                        if (form.getFieldValue('inventoryStatus') != action.key) {
                            form.setFieldValue('inventoryStatus', action.key);
                            form.validateFields(['inventoryStatus']);
                        }
                    }}
                />

                <Form.Item initialValue={productInfo.stockQuantity} name='stockQuantity' label='Số lượng' layout='horizontal' childElementPosition='right' hidden={!stockQuantityVisible}
                    rules={[{ type: 'number', min: 0, max: 999999, message: 'Số lượng nằm trong khoảng từ 0 đến 999.999', validator: checkNumber }]}>
                    <FormattedNumberInput placeholder="0" formatImmediately />
                </Form.Item>
            </Form >
            <ProductOperationActions form={form} disableUpdateButton={!isFieldsTounch} />
        </>
    );
}

function ProductOperationActions({ form, disableUpdateButton = true }: { form: FormInstance, disableUpdateButton?: boolean }) {
    const [isPending, startTransition] = useTransition();


    async function submitForm(): Promise<void> {
        startTransition(() => {
            form.submit();
        })
    }


    return (
        <div className='flex flex-row bottom p-2 gap-x-2'>
            <Button disabled={disableUpdateButton} type="submit" loading={isPending} className="basis-full" color='primary' onClick={() => submitForm()}>Cập nhật</Button>
        </div>
    );
}
