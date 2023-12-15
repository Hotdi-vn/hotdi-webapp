import Image from 'next/image';
import styles from './FarmProfile.module.css';

export class FarmProfile {
    avatarUrl: string;
    name: string;
    lastUpdatedDate: Date;
    coverImageUrl: string;
    description: string;

    constructor(
        avatarUrl: string,
        name: string,
        lastUpdatedDate: Date,
        coverImageUrl: string,
        description: string
    ) {
        this.avatarUrl = avatarUrl
        this.name = name
        this.lastUpdatedDate = lastUpdatedDate
        this.coverImageUrl = coverImageUrl
        this.description = description
    }
}

export default function FarmProfileComponent({ farmProfile }:
    { farmProfile: FarmProfile }) {
    return (
        <div className={styles.farmProfile}>
            <div className={styles.farmInfo}>
                <Image src={farmProfile.avatarUrl} width={40} height={40} alt='Farm profile avatar image' />
                <div className={styles.farmName}>
                    <div><b>{farmProfile.name}</b></div>
                    <div>{farmProfile.lastUpdatedDate.toLocaleDateString()}</div>
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