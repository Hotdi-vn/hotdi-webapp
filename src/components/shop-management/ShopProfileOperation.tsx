'use client'

import { Address, ImageInfo, Location, ShopProfile, ShopProfileStatus } from "@/model/market-data-model";
import { Button, Form, ImageUploadItem, Input, NavBar, TextArea } from "antd-mobile";
import { BackButton } from "../button/BackButton";
import { FormInstance } from "antd-mobile/es/components/form";
import { MutableRefObject, RefObject, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "@/utils/message-utils";
import AddressInput from "../common/AddressInput";
import AvatarUploader from "../common/AvatarUploader";
import Image from "next/image";
import { submitMyShopProfile, createMyShopProfile, updateMyShopProfile } from "@/server-actions/shop-operation-actions";
import { createAddress, updateAddress } from "@/server-actions/address-operation-actions";

enum OperationAction {
    Save,
    Submit,
    ReSubmit,
}

export default function ShopProfileOperation({
    profile
}: {
    profile?: ShopProfile
}) {
    const router = useRouter();
    const [form] = Form.useForm<ShopProfile>();
    const [isFieldsTounch, setIsFieldsTounch] = useState<boolean>(form.isFieldsTouched());
    const actionRef = useRef<OperationAction | null>(null);

    const navBar =
        <NavBar backArrow={<BackButton redirectPath="/seller/shop" />} >
            <div className="text-xl text-left font-normal">Thiết lập shop</div>
        </NavBar>;

    async function saveProfile(shopProfile: ShopProfile) {
        console.log('Save profile');
        console.log(shopProfile);
        const address = await saveShopAddress(shopProfile);
        shopProfile.addresses = [address.data._id];
        if (profile) {
            return updateMyShopProfile(shopProfile);
        } else {
            return createMyShopProfile(shopProfile);
        }
    }

    async function submitProfile(shopProfile: ShopProfile) {
        console.log('submit profile');
        console.log(shopProfile);
        const address = await saveShopAddress(shopProfile);
        shopProfile.addresses = [address.data._id];
        return submitMyShopProfile(shopProfile);
    }

    async function saveShopAddress(shopProfile: ShopProfile) {
        if (profile) {
            const currentAddress = profile.addresses[0] as Address;
            const newAddress = shopProfile.addresses[0] as Address;
            newAddress._id = currentAddress._id;
            return updateAddress(newAddress);
        } else {
            return createAddress(shopProfile.addresses[0] as Address);
        }
    }

    useEffect(() => {
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
                            switch (actionRef.current) {
                                case OperationAction.Save:
                                    await saveProfile(sellerProfile);
                                    showSuccess('Cập nhật hồ sơ thành công');
                                    break;
                                case OperationAction.Submit:
                                case OperationAction.ReSubmit:
                                    await submitProfile(sellerProfile);
                                    showSuccess('Nộp hồ sơ thành công');
                                    break;
                                default:
                                    break;
                            }
                            router.push(`/seller/shop`);
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
                        <div className="w-screen h-32 relative">
                            <div className="w-screen h-24 absolute top-0 left-0">
                                <Image src={'/shop-cover.png'} width={390} height={90} alt="Shop cover" />
                            </div>
                            <div className="hotdi-avatar-uploader absolute bottom-0 left-0 right-0 ml-auto mr-auto w-20">
                                <Form.Item name='avatarImageId' initialValue={profile ? { key: (profile.avatarImageId as ImageInfo)?._id, url: (profile.avatarImageId as ImageInfo)?.url } : undefined}>
                                    <AvatarUploader />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item name='name' label='Tên shop' rules={[{ required: true, max: 64, message: 'Vui lòng nhập tên shop' }]}
                            initialValue={profile?.name} disabled={profile?.status === ShopProfileStatus.Approved}
                        >
                            <TextArea placeholder='Nhập tên shop' maxLength={64} showCount rows={1} />
                        </Form.Item>

                        <Form.Item name='description' label='Mô tả shop' rules={[{ required: true, max: 3000, message: 'Vui lòng nhập mô tả shop' }]}
                            initialValue={profile?.description}
                        >
                            <TextArea placeholder='Nhập mô tả shop' maxLength={3000} showCount rows={5} />
                        </Form.Item>

                        <Form.Item name='businessLicense' label='Giấy phép đăng ký kinh doanh' rules={[{ required: false, max: 16, message: 'Giấy phép đăng ký kinh doanh tối đa 16 ký tự' }]}
                            initialValue={profile?.businessLicense} disabled={profile?.status === ShopProfileStatus.Approved}
                        >
                            <Input placeholder='Nhập giấy phép đăng ký kinh doanh' maxLength={16} />
                        </Form.Item>

                        <Form.Item label='Địa chỉ' name="addresses"
                            layout='vertical' childElementPosition='normal' arrow
                            initialValue={profile?.addresses[0]}
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                        >
                            <AddressInput />
                        </Form.Item>

                        <Form.Item name='userInCharge' label='Tên người chịu trách nhiệm' rules={[{ required: true, max: 64, message: 'Vui lòng nhập tên người chịu trách nhiệm' }]}
                            initialValue={profile?.userInCharge}
                        >
                            <TextArea placeholder='Nhập tên người chịu trách nhiệm' maxLength={64} showCount rows={1} />
                        </Form.Item>

                        <Form.Item name='phone' label='Số điện thoại' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }, { pattern: /^\d+$/g, max: 11, message: 'Số điện thoại không hợp lệ' }]}
                            initialValue={profile?.phone}
                        >
                            <Input placeholder='Nhập số điện thoại' maxLength={11} />
                        </Form.Item>

                        <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Vui lòng nhập email' }, { type: "email", max: 64, message: 'Email không hợp lệ' }]}
                            initialValue={profile?.email}
                        >
                            <Input placeholder='Nhập email' maxLength={64} />
                        </Form.Item>

                        <Form.Item name='taxCode' label='Mã số thuế cá nhân' rules={[{ required: true, message: 'Vui lòng nhập mã số thuế cá nhân' }, { pattern: /^\d+$/g, max: 16, message: 'Mã số thuế không hợp lệ' }]}
                            initialValue={profile?.taxCode}
                        >
                            <Input placeholder='Nhập mã số thuế cá nhân' maxLength={16} />
                        </Form.Item>

                    </Form>
                </div>
            </div>
            <ShopOperationActions form={form} profileStatus={profile?.status} actionRef={actionRef} />
        </>
    )
}

function ShopOperationActions({
    form,
    profileStatus = ShopProfileStatus.New,
    disableUpdateButton = true,
    actionRef,
}: {
    form: FormInstance,
    profileStatus?: ShopProfileStatus,
    disableUpdateButton?: boolean,
    actionRef: MutableRefObject<any>
}) {
    const [isPending, startTransition] = useTransition();


    async function submitForm(action: OperationAction): Promise<void> {
        startTransition(() => {
            actionRef.current = action;
            const uploadedAvatar = form.getFieldValue('avatarImageId') as ImageUploadItem;
            if (uploadedAvatar) {
                form.setFieldValue('avatarImageId', uploadedAvatar.key);
            }
            const address = form.getFieldValue('addresses') as Address;
            if (address) {
                form.setFieldValue('addresses', [address]);
            }
            form.submit();
        })
    }

    function generateButtons() {
        switch (profileStatus) {
            case ShopProfileStatus.New:
            case ShopProfileStatus.Rejected:
                return (
                    <>
                        <Button className="basis-1/2" color="default" fill="outline" onClick={() => submitForm(OperationAction.Save)}>Lưu</Button>
                        <Button className="basis-1/2" color="primary" onClick={() => submitForm(OperationAction.Submit)}>Nộp hồ sơ</Button>
                    </>
                );
            case ShopProfileStatus.WaitingApproval:
                return <Button block color="primary" onClick={() => submitForm(OperationAction.ReSubmit)}>Nộp lại hồ sơ</Button>;
            case ShopProfileStatus.Approved:
                return <Button block color="primary" onClick={() => submitForm(OperationAction.Save)}>Lưu</Button>;
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