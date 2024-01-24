'use client'

import { Button } from "@/components/common/antd_mobile_client_wrapper";
import { InventoryStatus } from "@/model/market-data-model";
import ActionSheet, { Action } from "antd-mobile/es/components/action-sheet";
import Icon from "@/components/common/icon_component";
import { useState } from "react";

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

const actionConfig: { [key: string]: Action } = {
    UpdateInventory: {
        key: 'UpdateInventory',
        text: 'Cập nhật kho'
    },
    Copy: {
        key: 'Copy',
        text: 'Sao chép'
    },
    Edit: {
        key: 'Edit',
        text: 'Sửa'
    },
    OutOfStock: {
        key: 'OutOfStock',
        text: 'Hết hàng'
    },
    Show: {
        key: 'Show',
        text: 'Hiển thị'
    },
    Hide: {
        key: 'Hide',
        text: 'Ẩn'
    },
    Delete: {
        key: 'Delete',
        text: 'Xóa'
    },
}

function getActions(inventoryStatus: InventoryStatus) {
    let actionList = [];
    switch (inventoryStatus) {
        case InventoryStatus.InStock:
            actionList.push(Actions.UpdateInventory, Actions.Copy, Actions.Edit, Actions.OutOfStock, Actions.Hide, Actions.Delete);
            break;
        case InventoryStatus.OutOfStock:
            actionList.push(Actions.UpdateInventory, Actions.Copy, Actions.Edit, Actions.Hide, Actions.Delete);
            break;
        case InventoryStatus.Hidden:
            actionList.push(Actions.UpdateInventory, Actions.Show, Actions.Edit, Actions.Copy, Actions.Delete);
            break;
        default:
            break;
    }

    return actionList.map(action => actionConfig[action.toString()]);
}

export default function ProductActions({ inventoryStatus }: { inventoryStatus: InventoryStatus }) {
    const [moreActionsVisible, setMoreActionsVisible] = useState(false);

    const actions = getActions(inventoryStatus);
    const [displayActions, moreActions] =
        actions.length <= DISPLAY_ACTIONS_NUM ?
            [actions, []] :
            [actions.slice(0, DISPLAY_ACTIONS_NUM), actions.slice(DISPLAY_ACTIONS_NUM)];

    return (
        <div className="flex flex-row justify-between">
            {displayActions.map(action => <Button key={action.key}>{action.text}</Button>)};
            <div>
                <Button onClick={() => setMoreActionsVisible(true)}><Icon name='more' /></Button>
                <ActionSheet
                    visible={moreActionsVisible}
                    actions={moreActions}
                    onClose={() => setMoreActionsVisible(false)}
                />
            </div>
        </div>
    );
}