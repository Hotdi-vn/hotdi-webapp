import Image from 'next/image';
import styles from './FarmProfile.module.css';
import Date from '@/components/common/Date';

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
        <div className={styles.farmProfile}>
            <div className={styles.farmInfo}>
                <Image src={farmProfile.avatarUrl} width={40} height={40} alt='Farm profile avatar image' />
                <div className={styles.farmName}>
                    <div className="text-base"><b>{farmProfile.name}</b></div>
                    <Date date={new (Date as any)(farmProfile.updatedAt)}></Date>
                </div>
            </div>
            <div className={styles.farmCoverImage}>
                <Image src={farmProfile.coverImageUrl} width={420} height={260} alt='Farm profile cover image' />
            </div>
            <div className={styles.farmDescription}>
                {farmProfile.description}
            </div>
        </div>
    );
}