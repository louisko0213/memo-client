import styles from '../styles/modal.module.scss';
import { checkPasswordApi } from '../pages/api/all';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteMemoApi } from '../pages/api/all';

export default function Modal(props) {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [needPassword, setNeedPassword] = useState(false);

    const checkPass = async () => {
        if (props.modalType === 'delete') {
            if (needPassword) {
                const res = await checkPasswordApi(props.id, password);

                if (res === 'reject') {
                    setPasswordError(true);
                    return;
                }
            }
            await deleteMemoApi(props.id);
            props.setShowModal(false);
            props.refreshMemoList();
        } else {
            const res = await checkPasswordApi(props.id, password);

            if (res === 'pass') {
                router.push(`/update/${props.id}`);
            } else {
                setPasswordError(true);
            }
        }
    }

    useEffect(() => {
        setNeedPassword(props.needPassword);

        return () => {
            setNeedPassword(false);
            props.setNeedPassword(false);
        }
    }, []);

    return (
        <div className={styles['wrap']}>
            <div className={styles['wrap-inner']}>
                {
                    props.modalType === 'delete' &&
                    <h2>確定要刪除嗎？</h2>
                }
                {
                    needPassword &&
                    <>
                        <h3>請輸入密碼：</h3>
                        <input
                            type="password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <br />
                        <div className={styles.error}>
                            <p className={`red fz-12 m-0`}>{passwordError ? '密碼錯誤' : ''}</p>
                        </div>
                    </>
                }
                <div className={styles.btns}>
                    <a
                        className='btn fz-13'
                        onClick={checkPass}
                    >確認</a>
                    <a
                        className='btn fz-13'
                        onClick={() => {
                            props.setShowModal(false);
                            setPasswordError(false);
                        }}
                    >取消</a>
                </div>
            </div>
        </div>
    )
}
