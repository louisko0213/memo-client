import styles from '../styles/create.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createMemoApi, updateMemoApi } from '../pages/api/memo';
import { formatDate } from '../lib/utils';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

export default function Common(props) {
    const router = useRouter();
    const pathname = router.pathname.split('/');
    const head = pathname[1] === 'update' ? '修改' : '新增';
    const user = getCookie('user');
    const [title, setTitle] = useState(props.title || '');
    const [content, setContent] = useState(props.content || '');
    const [needPassword, setNeedPassword] = useState(props.password ? true : false);
    const [password1, setPassword1] = useState(props.password || '');
    const [password2, setPassword2] = useState(props.password || '');
    const [passwordIncorrect, setPasswordIncorrect] = useState(false);
    const date = formatDate(new Date());
    useEffect(() => {
        if (!needPassword) {
            setPassword1(null);
            setPassword2(null);
        }
    }, [needPassword])
    const checkPassword = () => {
        if (password1 === password2) {
            setPasswordIncorrect(false);
            return true;
        } else {
            setPasswordIncorrect(true);
            return false;
        }
    };

    const clickBtn = async () => {
        if (title && content && checkPassword()) {
            if (pathname[1] === 'create') await createMemoApi(title, content, password2, date, user);
            if (pathname[1] === 'update') await updateMemoApi(props.id, title, content, password2, date);
            router.push('/');
        } else {
            alert('請完整填寫');
        }
    };

    return (
        <div className='positionr container'>
            <Link href="/">
                <a className={`${styles.back} btn positiona fz-13`}>返回備忘錄</a>
            </Link>
            <h1 className="text-center">{head}備忘錄</h1>
            <div className={styles.create}>
                <div className={styles['create-wrap']}>
                    <div>
                        <label className={styles.label}>
                            <span className='red'>*</span>標題：
                        </label>
                        <input
                            type="text"
                            placeholder="請輸入標題"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.label}>
                            <span className='red'>*</span>內容：
                        </label>
                        <textarea
                            type="text"
                            placeholder="請輸入備忘錄內容"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>設置密碼：</label>
                        <input
                            type="radio"
                            id="pwd_yes"
                            name="password"
                            checked={needPassword}
                            onChange={() => setNeedPassword(true)}
                        />
                        <label
                            htmlFor="pwd_yes"
                            className="mr-2"
                            onClick={() => setNeedPassword(true)}
                        >是</label>
                        <input
                            type="radio"
                            id="pwd_no" name="password"
                            checked={!needPassword}
                            onChange={() => setNeedPassword(false)}
                        />
                        <label
                            htmlFor="pwd_no"
                            onClick={() => setNeedPassword(false)}
                        >否</label>
                    </div>
                    {
                        needPassword &&
                        <>
                            <div>
                                <label className={styles.label}>
                                    <span className='red'>*</span>密碼：
                                </label>
                                <input
                                    type="password"
                                    placeholder="請輸入密碼"
                                    value={password1}
                                    onChange={event => setPassword1(event.target.value)}
                                />
                            </div>
                            <div>
                                <label className={styles.label}>
                                    <span className='red'>*</span>確認密碼：
                                </label>
                                <input
                                    type="password"
                                    placeholder="請再次輸入密碼"
                                    value={password2}
                                    onChange={event => setPassword2(event.target.value)}
                                />
                            </div>
                            {
                                passwordIncorrect && <p className={`red fz-12 ${styles.alert}`}>請再次檢查密碼</p>
                            }
                        </>
                    }
                    <a
                        className={`${styles['create-btn']} btn fz-13`}
                        onClick={clickBtn}
                    >{head}</a>
                </div>
            </div>
        </div>
    )
}