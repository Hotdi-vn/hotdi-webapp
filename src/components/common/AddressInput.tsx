'use client'

import { Address, Location } from "@/model/market-data-model";
import { Button, Form, Input, NavBar, Popup } from "antd-mobile";
import { useState } from "react";
import { BackButton } from "../button/BackButton";
import LocationSelector from "./LocationSelector";

export default function AddressInput({
    value,
    onChange,
    title = 'Địa chỉ',
    placeholder = 'Nhập địa chỉ',
}: {
    value?: Address,
    onChange?: (value: Partial<Address>) => void,
    title?: string,
    placeholder?: string,
}) {
    const [visible, setVisible] = useState<boolean>(false);
    const [city, setCity] = useState<Location | undefined>(value?.city);
    const [district, setDistrict] = useState<Location | undefined>(value?.district);
    const [ward, setWard] = useState<Location | undefined>(value?.ward);
    const [street, setStreet] = useState<string | undefined>(value?.address);

    const triggerValue = (changedValue: Partial<Address>) => {
        onChange?.({ ...value, ...changedValue });
    }

    const onCityChange = (location?: Location) => {
        setCity(location);
    }

    const onDistrictChange = (location?: Location) => {
        setDistrict(location);
    }

    const onWardChange = (location?: Location) => {
        setWard(location);
    }

    const onAddressChange = (address?: string) => {
        setStreet(address);
    }

    return (
        <div>

            <div onClick={() => setVisible(true)}>
                <div className="flex flex-col">
                    {value ?
                        <>
                            <div>{city?.name}</div>
                            <div>{district?.name}</div>
                            <div>{ward?.name}</div>
                            <div>{street}</div>
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
                    <Form.Item name="city" style={{ padding: '0 12px' }} label='Tỉnh / Thành phố' initialValue={city}
                        layout='vertical' childElementPosition='normal' arrow
                    >
                        <LocationSelector key={'city'} onChange={(value) => onCityChange(value)} placeholder="Chọn tỉnh / thành" title="Tỉnh / Thành phố" />
                    </Form.Item>

                    <Form.Item name="district" style={{ padding: '0 12px' }} label='Huyện / Quận' initialValue={district}
                        layout='vertical' childElementPosition='normal' arrow dependencies={['city']} disabled={!city}
                    >
                        <LocationSelector key={'district'} parentCode={city?.code} onChange={(value) => onDistrictChange(value)} placeholder="Chọn huyện / quận" title="Huyện / Quận" />
                    </Form.Item>

                    <Form.Item name="ward" style={{ padding: '0 12px' }} label='Xã / Phường' initialValue={ward}
                        layout='vertical' childElementPosition='normal' arrow dependencies={['city', 'district']} disabled={!district}
                    >
                        <LocationSelector key={'ward'} parentCode={district?.code} onChange={(value) => onWardChange(value)} placeholder="Chọn xã / phường" title="Xã / Phường" />
                    </Form.Item>

                    <Form.Item name="street" style={{ padding: '0 12px' }} label='Số nhà, đường' initialValue={street}
                        layout='vertical' childElementPosition='normal'
                    >
                        <Input onChange={(value) => onAddressChange(value)} placeholder="Nhập địa chỉ nhà và tên đường" />
                    </Form.Item>
                </div>

                <div className="flex flex-row bottom p-2 gap-x-2">
                    <Button block color="primary" onClick={() => {
                        triggerValue({
                            city: city,
                            district: district,
                            ward: ward,
                            address: street,
                        });
                        setVisible(false);
                    }}>Xác nhận địa chỉ</Button>
                </div>
            </Popup>
        </div>
    );
}