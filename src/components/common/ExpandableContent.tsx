import { Divider, Ellipsis } from "antd-mobile";
import { PropagationEvent } from "antd-mobile/es/utils/with-stop-propagation";
import { ReactNode } from "react";
import Icon from "@/components/common/icon_component";

export default function ExpandableContent({
    content,
    rows = 1,
    expandText =
    <div>
        <Divider />
        <div className="flex items-center justify-center gap-2 pb-4">
            <div>
                Xem thêm
            </div>
            <div>
                <Icon name='navigateDown' />
            </div>
        </div>
    </div>,
    collapseText =
    <div>
        <Divider />
        <div className="flex items-center justify-center gap-2 pb-4">
            <div>
                Thu gọn
            </div>
            <div>
                <Icon name='navigateUp' />
            </div>
        </div>
    </div>,
    defaultExpanded = false,
    direction = 'end',
    onContentClick,
    stopPropagationForActionButtons = []
}: {
    content: string,
    rows?: number,
    expandText?: ReactNode,
    collapseText?: ReactNode,
    defaultExpanded?: boolean,
    direction?: 'start' | 'end' | 'middle',
    onContentClick?: (e: React.MouseEvent) => void,
    stopPropagationForActionButtons?: PropagationEvent[]
}) {
    return (
        <Ellipsis
            content={content}
            rows={rows + 3}
            expandText={expandText}
            collapseText={collapseText}
            defaultExpanded={defaultExpanded}
            direction={direction}
            onContentClick={onContentClick}
            stopPropagationForActionButtons={stopPropagationForActionButtons}
        />
    );
}
