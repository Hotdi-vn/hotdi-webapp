import { SkeletonParagraph, SkeletonTitle } from "antd-mobile/es/components/skeleton/skeleton";

export default function Loading() {
    return (<>
        <SkeletonTitle animated />
        <SkeletonParagraph animated lineCount={30} />
    </>);
}