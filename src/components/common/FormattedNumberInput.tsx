import { Input } from "antd-mobile";
import { ReactNode, useState } from "react";

export default function FormattedNumberInput(
    { value, onChange, locales = 'vi-VN', prefix, suffix, placeholder = '', textAlign = 'right' }
        : { value?: number, onChange?: (value?: number) => void, locales?: string, prefix?: ReactNode, suffix?: ReactNode, placeholder?: string, textAlign?: string }
) {
    const [formattedValue, setFormattedValue] = useState<string>(value?.toLocaleString(locales) ?? '');

    const triggerValue = (changedValue?: number) => {
        onChange?.(changedValue);
    }

    function formatNumberOnKeyUp() {
        if (formattedValue) {
            value = parseInt(formattedValue.replace(/[^0-9-]/g, ''), 10);
        } else {
            value = undefined;
        }
        setFormattedValue(value ? value.toLocaleString(locales) : '');
        triggerValue(value);
    }

    const onFormattedValueChange = (value: string) => {
        setFormattedValue(value);
    }

    const onNumberValueChange = (value?: string) => {
        triggerValue(value ? parseInt(value) : undefined)
    }

    return (
        <div className="flex flex-row gap-2 items-center">
            <div>
                {prefix}
            </div>
            <div className="grow">
                <Input style={{ '--text-align': textAlign }} value={formattedValue} placeholder={placeholder} type="string" onKeyUp={formatNumberOnKeyUp} onChange={onFormattedValueChange} />
            </div>
            <div>
                <Input value={value?.toString()} type="hidden" onChange={onNumberValueChange} />
            </div>
            <div>
                {suffix}
            </div>
        </div>
    );
}