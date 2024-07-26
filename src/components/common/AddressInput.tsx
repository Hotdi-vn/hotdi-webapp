'use client'

import { Address, Location } from "@/model/market-data-model";
import { Button, Form, Input, NavBar, Popup } from "antd-mobile";
import { useEffect, useState } from "react";
import { BackButton } from "../button/BackButton";
import LocationSelector from "./LocationSelector";

export default function AddressInput({
    value,
    onChange,
    title = 'Địa chỉ',
    placeholder = 'Nhập địa chỉ',
}: {
    value?: Address,
    onChange?: (value: Address) => void,
    title?: string,
    placeholder?: string,
}) {
    const [visible, setVisible] = useState<boolean>(false);

    const triggerValue = (changedValue: Partial<Address>) => {
        onChange?.({ ...value, ...changedValue });
    }

    const onCityChange = (location?: Location) => {
        triggerValue({ city: location })
    }

    const onDistrictChange = (location?: Location) => {
        triggerValue({ district: location })
    }

    const onWardChange = (location?: Location) => {
        triggerValue({ ward: location })
    }

    const onAddressChange = (address?: string) => {
        triggerValue({ address: address })
    }

    useEffect(() => {
    }, []);

    return (
        <div>

            <div onClick={() => setVisible(true)}>
                <div className="flex flex-col">
                    {value ?
                        <>
                            <div>{(value?.city as Location)?.name}</div>
                            <div>{(value?.district as Location)?.name}</div>
                            <div>{(value?.ward as Location)?.name}</div>
                            <div>{value?.address}</div>
                        </>
                        :
                        placeholder
                    }
                </div>
            </div>

            <Popup visible={visible} position="right">
                <div className='top'>
                    <NavBar backArrow={<BackButton customOnClick={() => setVisible(false)} />} >
                        <div className="text-xl text-left font-normal">{title}</div>
                    </NavBar>
                </div>
                <div className="body h-screen w-screen">
                    <Form.Item name="city" style={{ padding: '0 12px' }} label='Tỉnh / Thành phố'
                        layout='vertical' childElementPosition='normal' arrow
                    >
                        <LocationSelector key={'city'} onChange={(value) => onCityChange(value)} placeholder="Chọn tỉnh / thành" title="Tỉnh / Thành phố" />
                    </Form.Item>

                    <Form.Item name="district" style={{ padding: '0 12px' }} label='Huyện / Quận'
                        layout='vertical' childElementPosition='normal' arrow dependencies={['province']}
                    >
                        <LocationSelector key={'district'} parentCode={(value?.city as Location)?.code} onChange={(value) => onDistrictChange(value)} placeholder="Chọn huyện / quận" title="Huyện / Quận" />
                    </Form.Item>

                    <Form.Item name="ward" style={{ padding: '0 12px' }} label='Xã / Phường'
                        layout='vertical' childElementPosition='normal' arrow dependencies={['province', 'district']}
                    >
                        <LocationSelector key={'ward'} parentCode={(value?.district as Location)?.code} onChange={(value) => onWardChange(value)} placeholder="Chọn xã / phường" title="Xã / Phường" />
                    </Form.Item>

                    <Form.Item name="street" style={{ padding: '0 12px' }} label='Số nhà, đường'
                        layout='vertical' childElementPosition='normal'
                    >
                        <Input onChange={(value) => onAddressChange(value)} placeholder="Nhập địa chỉ nhà và tên đường" />
                    </Form.Item>
                </div>

                <div className="flex flex-row bottom p-2 gap-x-2">
                    <Button block color="primary" onClick={() => {
                        setVisible(false);
                    }}>Xác nhận địa chỉ</Button>
                </div>
            </Popup>
        </div>
    );
}