import Common from "../../components/common";
import { getMemoListApi, getMemoListByIdApi } from "../api/all";

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

export const getStaticPaths = async () => {
    const res = await getMemoListApi();
    const paths = await res.map(memo => ({
        params: { id: memo.id.toString() }
    }));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const memoData = await getMemoListByIdApi(params.id);

    return {
        props: {
            memoData: memoData[0]
        }
    }
}