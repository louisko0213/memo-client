import Common from "../../components/common";
import { getMemoListByIdApi } from "../api/memo";

export default function Update({ memoData }) {
    return (
        <Common
            id={memoData.id}
            title={memoData.title}
            content={memoData.content}
            password={memoData.password}
        />
    )
};

export const getServerSideProps = async ({ resolvedUrl }) => {
    const memoData = await getMemoListByIdApi(resolvedUrl.split('/')[2]);

    return {
        props: {
            memoData: memoData[0]
        }
    }
}