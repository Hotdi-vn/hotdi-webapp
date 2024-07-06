'use client'

import { Address, SellerProfile, SellerProfileStatus } from "@/model/market-data-model";
import { Button, Divider, Form, Input, NavBar, Popup, TextArea } from "antd-mobile";
import { BackButton } from "../button/BackButton";
import { FormInstance } from "antd-mobile/es/components/form";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { showError } from "@/utils/message-utils";
import Icon from '@/components/common/icon_component';

export default function ShopProfileOperation({
    profile
}: {
    profile: SellerProfile
}) {
    const router = useRouter();
    const [form] = Form.useForm<SellerProfile>();
    const [addressSelection, setAddressSelection] = useState<boolean>(false);
    const [isFieldsTounch, setIsFieldsTounch] = useState<boolean>(form.isFieldsTouched());

    const navBar =
        <NavBar backArrow={<BackButton redirectPath="/seller/shop" />} >
            <div className="text-xl text-left font-normal">Thiết lập shop</div>
        </NavBar>;


    useEffect(() => {
        form.setFieldsValue(profile);
    }, []);
    return (
        <>
            <div className='body'>
                <div className='top'>
                    {navBar}
                </div>
                <div>
                    <Form onFinish={async (sellerProfile) => {
                        try {

                        } catch (error) {
                            showError(error);
                        }
                    }}
                        requiredMarkStyle='none'
                        onFinishFailed={
                            (error) => {
                                console.log(error)
                            }
                        }
                        onFieldsChange={() => {
                            if (!isFieldsTounch) {
                                setIsFieldsTounch(true);
                            }
                        }}
                        name="sellerProfileOperationForm"
                        form={form}
                    >
                        <Form.Item name='name' label='Tên shop' rules={[{ required: true, max: 64, message: 'Vui lòng nhập tên shop' }]}>
                            <TextArea placeholder='Nhập tên sản phẩm' maxLength={64} showCount rows={1} />
                        </Form.Item>

                        <Form.Item name='description' label='Mô tả shop' rules={[{ required: true, max: 3000, message: 'Vui lòng nhập mô tả shop' }]}>
                            <TextArea placeholder='Nhập mô tả shop' maxLength={3000} showCount rows={5} />
                        </Form.Item>

                        <Form.Item name='license' label='Giấy phép đăng ký kinh doanh' rules={[{ required: false, max: 16, message: 'Giấy phép đăng ký kinh doanh tối đa 16 ký tự' }]}>
                            <Input placeholder='Nhập giấy phép đăng ký kinh doanh' maxLength={16} />
                        </Form.Item>

                        <Form.Item label='Địa chỉ'
                            layout='vertical' childElementPosition='normal' arrow
                            shouldUpdate={(prevValues, curValues) => prevValues.addresses !== curValues.addresses}
                            onClick={() => setAddressSelection(true)}
                        >
                            {
                                ({ getFieldValue }) =>
                                    <div className="flex flex-col">
                                        <div>{getFieldValue('addresses') ? getFieldValue('addresses')[0].city : ''}</div>
                                        <div>{getFieldValue('addresses') ? getFieldValue('addresses')[0].district : ''}</div>
                                        <div>{getFieldValue('addresses') ? getFieldValue('addresses')[0].ward : ''}</div>
                                        <div>{getFieldValue('addresses') ? getFieldValue('addresses')[0].address : ''}</div>
                                    </div>
                            }
                        </Form.Item>

                        <Popup
                            position='right'
                            visible={addressSelection}
                            forceRender
                            onClose={() => {
                                form.validateFields(['addresses']);
                                setAddressSelection(false);
                            }}
                        >
                            <div>
                                <div className='top'>
                                    <NavBar backArrow={<BackButton customOnClick={() => { setAddressSelection(false); }} />} >
                                        <div className="text-xl text-left font-normal">Địa chỉ</div>
                                    </NavBar>
                                </div>
                                <div className="body w-screen h-screen">
                                    <Form.Item style={{ padding: '0 12px' }} label='Tỉnh / Thành phố'
                                        layout='vertical' childElementPosition='normal' arrow
                                        shouldUpdate={(prevValues, curValues) => prevValues.addresses !== curValues.addresses}
                                        onClick={() => setAddressSelection(true)}
                                    >
                                        {
                                            ({ getFieldValue }) =>
                                                <div className="flex flex-col">
                                                    <div>{getFieldValue('addresses') ? getFieldValue('addresses')[0].city : ''}</div>
                                                </div>
                                        }
                                    </Form.Item>

                                    <Form.Item style={{ padding: '0 12px' }} label='Huyện / Quận'
                                        layout='vertical' childElementPosition='normal' arrow
                                        shouldUpdate={(prevValues, curValues) => prevValues.addresses !== curValues.addresses}
                                        onClick={() => setAddressSelection(true)}
                                    >
                                        {
                                            ({ getFieldValue }) =>
                                                <div className="flex flex-col">
                                                    <div>{getFieldValue('addresses') ? getFieldValue('addresses')[0].district : ''}</div>
                                                </div>
                                        }
                                    </Form.Item>

                                    <Form.Item style={{ padding: '0 12px' }} label='Xã / Phường'
                                        layout='vertical' childElementPosition='normal' arrow
                                        shouldUpdate={(prevValues, curValues) => prevValues.addresses !== curValues.addresses}
                                        onClick={() => setAddressSelection(true)}
                                    >
                                        {
                                            ({ getFieldValue }) =>
                                                <div className="flex flex-col">
                                                    <div>{getFieldValue('addresses') ? getFieldValue('addresses')[0].ward : ''}</div>
                                                </div>
                                        }
                                    </Form.Item>

                                    <Form.Item style={{ padding: '0 12px' }} label='Số nhà, đường'
                                        layout='vertical' childElementPosition='normal' arrow
                                        shouldUpdate={(prevValues, curValues) => prevValues.addresses !== curValues.addresses}
                                        onClick={() => setAddressSelection(true)}
                                    >
                                        {
                                            ({ getFieldValue }) =>
                                                <div className="flex flex-col">
                                                    <div>{getFieldValue('addresses') ? getFieldValue('addresses')[0].address : ''}</div>
                                                </div>
                                        }
                                    </Form.Item>
                                </div>
                                <div className="flex flex-row bottom p-2 gap-x-2">
                                    <Button block color="primary" onClick={() => {
                                        form.validateFields(['addresses']);
                                        setAddressSelection(false);
                                    }}>Xác nhận địa chỉ</Button>
                                </div>
                            </div>
                        </Popup>

                        <Form.Item name='ownerName' label='Tên người chịu trách nhiệm' rules={[{ required: true, max: 64, message: 'Vui lòng nhập tên người chịu trách nhiệm' }]}>
                            <TextArea placeholder='Nhập tên người chịu trách nhiệm' maxLength={64} showCount rows={1} />
                        </Form.Item>

                        <Form.Item name='phone' label='Số điện thoại' rules={[{ required: true, max: 11, message: 'Vui lòng nhập số điện thoại' }]}>
                            <Input placeholder='Nhập số điện thoại' maxLength={11} />
                        </Form.Item>

                        <Form.Item name='email' label='Email' rules={[{ required: true, max: 64, message: 'Vui lòng nhập email' }]}>
                            <Input placeholder='Nhập email' maxLength={64} />
                        </Form.Item>

                        <Form.Item name='taxNumber' label='Mã số thuế cá nhân' rules={[{ required: true, max: 16, message: 'Vui lòng nhập mã số thuế cá nhân' }]}>
                            <Input placeholder='Nhập mã số thuế cá nhân' maxLength={16} />
                        </Form.Item>

                    </Form>
                </div>
            </div>
            <ShopOperationActions form={form} profileStatus={profile.status} />
        </>
    )
}

function ShopOperationActions({
    form,
    profileStatus,
    disableUpdateButton = true
}: {
    form: FormInstance,
    profileStatus: SellerProfileStatus,
    disableUpdateButton?: boolean
}) {
    const [isPending, startTransition] = useTransition();


    async function submitForm(isDraft: boolean = false): Promise<void> {
        startTransition(() => {
            form.submit();
        })
    }

    function generateButtons() {
        switch (profileStatus) {
            case SellerProfileStatus.New:
            case SellerProfileStatus.Rejected:
                return (
                    <>
                        <Button className="basis-1/2" color="default" fill="outline">Lưu</Button>
                        <Button className="basis-1/2" color="primary">Nộp hồ sơ</Button>
                    </>
                );
            case SellerProfileStatus.WaitingApproval:
                return <Button className="basis-1/2" color="primary">Nộp lại hồ sơ</Button>;
            case SellerProfileStatus.Approved:
                return <Button className="basis-1/2" color="primary">Lưu</Button>;
            default:
                return '';

        }
    }


    return (
        <div className='flex flex-row bottom p-2 gap-x-2'>
            {
                generateButtons()
            }
        </div>
    );
}