'use client'

import { useState, useTransition } from "react";
import { Button, Form, NavBar, Radio, Space, Switch } from "antd-mobile";
import { InventoryStatus, InventoryStatusDisplayValue, ProductInfo, calculateInventoryDefaultTab } from "@/model/market-data-model";
import { sellerUpdateProductInventory } from "@/server-actions/product-operation-actions";
import FormattedNumberInput from "../common/FormattedNumberInput";
import { FormInstance } from "antd-mobile/es/components/form";
import { BackButton } from "../button/BackButton";
import { showError, showSuccess } from "@/utils/message-utils";
import { useRouter } from "next/navigation";

export default function ProductInventoryUpdate({
    productInfo,
    redirectPath = '/seller/shop/product',
}: {
    productInfo: ProductInfo,
    redirectPath?: string,
}) {
    const router = useRouter();
    const [form] = Form.useForm<ProductInfo>();
    const [stockQuantityVisible, setStockQuantityVisible] = useState<boolean>(productInfo?.inventoryManagementOption ?? false);
    const [isFieldsTounch, setIsFieldsTounch] = useState<boolean>(form.isFieldsTouched());

    const checkNumber = (rule: any, value: number) => {
        if (value >= rule.min && value <= rule.max) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(rule.message));
    }

    function redirect(productInfo: ProductInfo) {
        const querySign = redirectPath.includes('?') ? '&' : '?';
        router.push(`${redirectPath}${querySign}defaultTab=${calculateInventoryDefaultTab(productInfo)}`);
    }

    const navBar =
        <NavBar backArrow={<BackButton redirectPath={redirectPath} isConfirmedPrompt={isFieldsTounch} />} >
            <div className="text-xl text-left font-normal">Cập nhật tồn kho</div>
        </NavBar>;

    return (
        <>
            <div className='top'>{navBar}</div>
            <Form
                onFinish={async (productInfo) => {
                    try {
                        const product = await sellerUpdateProductInventory(productInfo);
                        redirect(product);
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
                name="createProductForm" form={form} className="body">
                <Form.Item name='_id' initialValue={productInfo._id} hidden />

                <Form.Item initialValue={productInfo.publishStatus} name='publishStatus' hidden />

                <Form.Item initialValue={productInfo.inventoryManagementOption} name='inventoryManagementOption' label='Quản lý tồn kho' layout='horizontal' childElementPosition='right'>
                    <Switch onChange={setStockQuantityVisible} defaultChecked={productInfo.inventoryManagementOption} />
                </Form.Item>

                <Form.Item name='inventoryStatus' initialValue={productInfo.inventoryStatus} label={productInfo.name} hidden={stockQuantityVisible}>
                    <Radio.Group>
                        <Space direction="horizontal">
                            <Radio value={InventoryStatus.InStock}>
                                {InventoryStatusDisplayValue[InventoryStatus.InStock]}
                            </Radio>
                            <Radio value={InventoryStatus.OutOfStock}>
                                {InventoryStatusDisplayValue[InventoryStatus.OutOfStock]}
                            </Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>

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
