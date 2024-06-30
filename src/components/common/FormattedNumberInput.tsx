import { Input } from "antd-mobile";
import { ReactNode, useState } from "react";

export default function FormattedNumberInput(
    { value, onChange, locales = 'vi-VN', prefix, suffix, placeholder = '', textAlign = 'right', formatImmediately = false, isFloat = false }
        : { value?: number, onChange?: (value?: number) => void, locales?: string, prefix?: ReactNode, suffix?: ReactNode, placeholder?: string, textAlign?: string, formatImmediately?: boolean, isFloat?: boolean }
) {
    const [formattedValue, setFormattedValue] = useState<string>(value?.toLocaleString(locales) ?? '');

    const triggerValue = (changedValue?: number) => {
        onChange?.(changedValue);
    }

    function parseValue(value: string) {
        return isFloat ? parseFloat(value) : parseInt(value, 10);
    }

    function preProcessFormattedValue(value: string) {
        const regex = isFloat ? /[^0-9-.]/g : /[^0-9-]/g;
        if (isFloat) {
            value = value.replace(',', '.');
        }
        return value.replace(regex, '');
    }

    function formatNumber() {
        if (formattedValue) {
            value = parseValue(preProcessFormattedValue(formattedValue));
        } else {
            value = undefined;
        }
        setFormattedValue(value || value === 0 ? value.toLocaleString(locales) : '');
        triggerValue(value);
    }

    const onFormattedValueChange = (value: string) => {
        setFormattedValue(value);
    }

    const onNumberValueChange = (value?: string) => {
        triggerValue(value ? parseValue(value) : undefined)
    }

    return (
        <div className="flex flex-row gap-2 items-center">
            <div className="basis-1/12">
                {prefix}
            </div>
            <div className="grow">
                <Input style={{ '--text-align': textAlign }} value={formattedValue} placeholder={placeholder} type="string"
                    onKeyUp={formatImmediately ? formatNumber : undefined} onBlur={formatImmediately ? undefined : formatNumber}
                    onChange={onFormattedValueChange} />
            </div>
            <div>
                <Input value={value?.toString()} type="hidden" onChange={onNumberValueChange} />
            </div>
            <div className="basis-1/12">
                {suffix}
            </div>
        </div>
    );
}