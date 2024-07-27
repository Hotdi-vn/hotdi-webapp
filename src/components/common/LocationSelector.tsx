'use client'

import { getLocationByParentCode } from "@/server-actions/shop-operation-actions";
import { CheckList, NavBar, Popup } from "antd-mobile";
import { useEffect, useState } from "react";
import { BackButton } from "../button/BackButton";
import { Location } from "@/model/market-data-model";

export default function LocationSelector({
    parentCode = '0',
    value,
    onChange,
    title,
    placeholder,
}: {
    parentCode?: string,
    value?: Location | string,
    onChange?: (value?: Location) => void,
    title: string,
    placeholder?: string,
}) {
    const [locationList, setLocationList] = useState<Location[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

    const triggerValue = (changedValue?: Location) => {
        onChange?.(changedValue);
    }

    function getValue() {
        if (!value) {
            return '';
        }
        if (typeof value === 'object') {
            return (value as Location).name;
        }
        return value;
    }

    async function loadLocation() {
        const res = await getLocationByParentCode(parentCode);
        setLocationList(res.data);
        triggerValue(undefined);
    }

    useEffect(() => {
        loadLocation();
    }, [parentCode]);

    return (
        <div>

            <div onClick={() => setVisible(true)}>
                {value ? getValue()?.toString() : placeholder}
            </div>

            <Popup visible={visible} position="right">
                <div className='top'>
                    <NavBar backArrow={<BackButton customOnClick={() => setVisible(false)} />} >
                        <div className="text-xl text-left font-normal">{title}</div>
                    </NavBar>
                </div>
                <div className="body h-screen w-screen">
                    <CheckList defaultValue={value ? [getValue()?.toString()] : undefined} onChange={(value) => triggerValue(locationList.find((location) => location.name === value.at(0)))}>
                        {
                            locationList.map(
                                (location, index) =>
                                    <CheckList.Item key={location.code} value={location.name}>{location.name}</CheckList.Item>
                            )
                        }
                    </CheckList>
                </div>
            </Popup>
        </div>
    );
}