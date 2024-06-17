'use client'

import { Button } from "@/components/common/antd_mobile_client_wrapper";
import { InventoryStatus, InventoryTabName, ProductInfo, PublishStatus } from "@/model/market-data-model";
import ActionSheet, { Action } from "antd-mobile/es/components/action-sheet";
import Icon from "@/components/common/icon_component";
import { useContext, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { sellerCopyProduct, sellerDeleteProduct, sellerHideProduct, sellerMarkOutOfStockProduct, sellerPublishProduct } from "@/server-actions/product-operation-actions";
import { showDeleteConfirmation, showError, showSuccess } from "@/utils/message-utils";
import { InventoryDataContext, TabData } from "../InventoryTabData";

const DISPLAY_ACTIONS_NUM = 3;

enum Actions {
    UpdateInventory = 'UpdateInventory',
    Copy = 'Copy',
    Edit = 'Edit',
    OutOfStock = 'OutOfStock',
    Show = 'Show',
    Hide = 'Hide',
    Delete = 'Delete',
}

export default function ProductActions({ productInfo }:
    { productInfo: ProductInfo }) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const inventoryDataContext = useContext(InventoryDataContext)!;

    const actionConfig: { [key: string]: Action } = {
        UpdateInventory: {
            key: 'UpdateInventory',
            text: 'Cập nhật kho',
            onClick() {
                router.push(`/seller/shop/product/${productInfo._id}/updateInventory`);
            },
        },
        Copy: {
            key: 'Copy',
            text: 'Sao chép',
            onClick() {
                startTransition(async () => {
                    try {
                        const copyProduct = { ...productInfo, _id: '', name: `${productInfo.name} (sao chép)` };
                        const createdProduct = await sellerCopyProduct(copyProduct);
                        updateInventoryData(Actions.Copy, createdProduct);
                        showSuccess('Sao chép sản phẩm thành công');
                    } catch (error) {
                        showError(error);
                    }
                })
            },
        },
        Edit: {
            key: 'Edit',
            text: 'Sửa',
            onClick() {
                router.push(`/seller/shop/product/${productInfo._id}`);
            },
        },
        OutOfStock: {
            key: 'OutOfStock',
            text: 'Hết hàng',
            onClick() {
                startTransition(async () => {
                    try {
                        const updatedProduct = await sellerMarkOutOfStockProduct(productInfo._id);
                        updateInventoryData(Actions.OutOfStock, updatedProduct);
                        showSuccess('Cập nhật kho thành công');
                    } catch (error) {
                        showError(error);
                    }
                })
            },
        },
        Show: {
            key: 'Show',
            text: 'Hiển thị',
            onClick() {
                startTransition(async () => {
                    try {
                        const updatedProduct = await sellerPublishProduct(productInfo._id);
                        updateInventoryData(Actions.Show, updatedProduct);
                        showSuccess('Cập nhật trạng thái thành công');
                    } catch (error) {
                        showError(error);
                    }
                })
            },
        },
        Hide: {
            key: 'Hide',
            text: 'Ẩn',
            onClick() {
                startTransition(async () => {
                    try {
                        const updatedProduct = await sellerHideProduct(productInfo._id);
                        updateInventoryData(Actions.Hide, updatedProduct);
                        showSuccess('Cập nhật trạng thái thành công');
                    } catch (error) {
                        showError(error);
                    }
                })
            },
        },
        Delete: {
            key: 'Delete',
            text: 'Xóa',
            onClick() {
                showDeleteConfirmation({
                    deleteFunc: () => {
                        startTransition(async () => {
                            try {
                                const deletedProduct = await sellerDeleteProduct(productInfo._id);
                                updateInventoryData(Actions.Delete, deletedProduct);
                                showSuccess('Xóa sản phẩm thành công');
                            } catch (error) {
                                showError(error);
                            }
                        })
                    }
                })
            },
        },
    };

    function updateInventoryData(action: Actions, updatedProduct: ProductInfo) {
        const inventoryData = { ...inventoryDataContext.inventoryData };

        if (action !== Actions.Copy) {
            // Remove item in active tab
            const currentTabData = inventoryData[inventoryDataContext.activeTab];
            currentTabData.initialProductList = currentTabData.initialProductList.filter(prod => prod._id !== updatedProduct._id);
            currentTabData.total--;
        }

        // Add item in target tab
        let targetTab = undefined;
        switch (action) {
            case Actions.OutOfStock:
                targetTab = inventoryData[InventoryTabName.OutOfStock];
                break;
            case Actions.Show:
                targetTab = inventoryData[updatedProduct.inventoryStatus === InventoryStatus.InStock ? InventoryTabName.InStock : InventoryTabName.OutOfStock];
                break;
            case Actions.Hide:
                targetTab = inventoryData[InventoryTabName.Hidden];
                break;
            case Actions.Copy:
                targetTab = inventoryData[inventoryDataContext.activeTab];
                break;
            default:
                break;
        }

        if (targetTab) {
            targetTab.initialProductList = [updatedProduct, ...targetTab.initialProductList];
            targetTab.total++;
        }

        inventoryDataContext.setInventoryData(inventoryData);
    }

    function getActions(inventoryStatus: InventoryStatus, publishStatus: PublishStatus) {
        let actionList = [];
        if (publishStatus == PublishStatus.Draft || publishStatus == PublishStatus.Hidden) {
            actionList.push(Actions.UpdateInventory, Actions.Show, Actions.Edit, Actions.Copy, Actions.Delete);
        } else {
            switch (inventoryStatus) {
                case InventoryStatus.InStock:
                    actionList.push(Actions.UpdateInventory, Actions.Copy, Actions.Edit, Actions.OutOfStock, Actions.Hide, Actions.Delete);
                    break;
                case InventoryStatus.OutOfStock:
                    actionList.push(Actions.UpdateInventory, Actions.Copy, Actions.Edit, Actions.Hide, Actions.Delete);
                    break;
                default:
                    break;
            }
        }

        return actionList.map(action => actionConfig[action.toString()]);
    }

    const [moreActionsVisible, setMoreActionsVisible] = useState(false);
    const actions = getActions(productInfo.inventoryStatus, productInfo.publishStatus);
    const [displayActions, moreActions] =
        actions.length <= DISPLAY_ACTIONS_NUM ?
            [actions, []] :
            [actions.slice(0, DISPLAY_ACTIONS_NUM), actions.slice(DISPLAY_ACTIONS_NUM)];

    function handleAction(action: Action) {
        if (action.onClick) {
            action.onClick();
        }
    }

    return (
        <div className="flex flex-row justify-between">
            {displayActions.map(action => <Button loading={pending} key={action.key} onClick={() => handleAction(action)}>{action.text}</Button>)}
            <div>
                <Button onClick={() => setMoreActionsVisible(true)}><Icon name='more' /></Button>
                <ActionSheet
                    visible={moreActionsVisible}
                    actions={moreActions}
                    onClose={() => setMoreActionsVisible(false)}
                    closeOnAction
                />
            </div>
        </div>
    );
}