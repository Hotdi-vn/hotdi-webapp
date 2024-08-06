'use client'

import { getLocationByParentCode } from "@/server-actions/shop-operation-actions";
import { CheckList, NavBar, Popup, SearchBar } from "antd-mobile";
import { useEffect, useMemo, useRef, useState } from "react";
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
    value?: Location,
    onChange?: (value?: Location) => void,
    title: string,
    placeholder?: string,
}) {
    const [locationList, setLocationList] = useState<Location[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const initialParentCode = useRef(parentCode);
    const [searchText, setSearchText] = useState('');

    const triggerValue = (changedValue?: Location) => {
        onChange?.(changedValue);
    }

    async function loadLocation() {
        const res = await getLocationByParentCode(parentCode);
        setLocationList(res.data);
        if (initialParentCode.current !== parentCode) {
            initialParentCode.current = parentCode;
            triggerValue(undefined);
        }
    }

    useEffect(() => {
        loadLocation();
    }, [parentCode]);

    const filteredLocation = useMemo(() => {
        locationList.sort((a, b) => (a.name.toLowerCase().localeCompare(b.name.toLowerCase())));
        if (searchText) {
            return locationList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
        } else {
            return locationList;
        }
    }, [locationList, searchText]);

    return (
        <div>

            <div onClick={() => setVisible(true)}>
                {value ? value.name : placeholder}
            </div>

            <Popup visible={visible} position="right">
                <div className='top'>
                    <NavBar backArrow={<BackButton customOnClick={() => setVisible(false)} />} >
                        <div className="text-xl text-left font-normal">{title}</div>
                    </NavBar>
                    <SearchBar
                        className="px-2"
                        placeholder='Tìm kiếm'
                        value={searchText}
                        onChange={v => {
                            setSearchText(v);
                        }}
                    />
                </div>
                <div className="body h-screen w-screen pb-6">
                    <CheckList defaultValue={value ? [value.code] : undefined} onChange={(value) => triggerValue(locationList.find((location) => location.code === value.at(0)))}>
                        {
                            filteredLocation.map(
                                (location, index) =>
                                    <CheckList.Item key={location.code} value={location.code}>{location.name}</CheckList.Item>
                            )
                        }
                    </CheckList>
                </div>
            </Popup>
        </div>
    );
}