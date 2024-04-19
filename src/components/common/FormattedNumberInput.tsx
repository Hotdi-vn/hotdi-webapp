import { Input } from "antd-mobile";
import { useState } from "react";

export default function FormattedNumberInput(
    { value = 0, onChange, locales = 'vi-VN' }
        : { value?: number, onChange?: (value: number) => void, locales?: string }
) {
    const [formattedValue, setFormattedValue] = useState<string>(value.toLocaleString(locales));

    const triggerValue = (changedValue: number) => {
        onChange?.(changedValue);
    }

    function formatNumberOnKeyUp() {
        if (!formattedValue) {
            return;
        }
        value = parseInt(formattedValue.replace(/[^0-9-]/g, ''), 10);
        if (!value) {
            return;
        }
        setFormattedValue(value.toLocaleString(locales));
        triggerValue(value);
    }

    const onFormattedValueChange = (value: string) => {
        setFormattedValue(value);
    }

    const onNumberValueChange = (value: string) => {
        triggerValue(parseInt(value))
    }

    return (
        <div>
            <Input value={formattedValue} placeholder='Ví dụ 100.000' type="string" onKeyUp={formatNumberOnKeyUp} onChange={onFormattedValueChange} />
            <Input value={value.toString()} type="hidden" onChange={onNumberValueChange} />
        </div>
    );
}