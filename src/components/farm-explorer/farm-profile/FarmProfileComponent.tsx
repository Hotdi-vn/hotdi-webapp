import DateFormatter from '@/components/common/DateFormatter';
import Image from 'next/image';

export class FarmProfile {
    id: string;
    avatarUrl: string;
    name: string;
    coverImageUrl: string;
    description: string;
    createdBy: string;
    createdAt: number;
    updatedBy: string;
    updatedAt: number;

    constructor(
        id: string,
        avatarUrl: string,
        name: string,
        coverImageUrl: string,
        description: string,
        createdBy: string,
        createdAt: number,
        updatedBy: string,
        updatedAt: number
    ) {
        this.id = id;
        this.avatarUrl = avatarUrl;
        this.name = name;
        this.coverImageUrl = coverImageUrl;
        this.description = description;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedBy = updatedBy;
        this.updatedAt = updatedAt;
    }
}

export default function FarmProfileComponent({ farmProfile }:
    { farmProfile: FarmProfile }) {
    return (
        <div className="flex flex-col items-start gap-3 bg-white">
            <div className="flex flex-row gap-[5px] p-2.5">
                <Image src={farmProfile.avatarUrl} width={40} height={40} alt='Farm profile avatar image' />
                <div className="flex flex-col">
                    <div className="text-base"><b>{farmProfile.name}</b></div>
                    <DateFormatter date={new Date(farmProfile.updatedAt)}></DateFormatter>
                </div>
            </div>
            <div className="flex">
                <Image src={farmProfile.coverImageUrl} width={420} height={260} alt='Farm profile cover image' />
            </div>
            <div className="flex p-[5px]">
                {farmProfile.description}
            </div>
        </div>
    )
}