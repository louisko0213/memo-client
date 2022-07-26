import { useEffect, useState } from 'react';
import styles from '../styles/modal.module.scss';
import { userSignupApi, userLoginApi } from '../pages/api/user';
import { setCookie } from 'cookies-next';

export default function Login(props) {
    const [type, setType] = useState(props.userModalType);
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const clickButton = async () => {
        if (type === 'login') {
            if (account && password) {
                const result = await userLoginApi(account, password);

                if (result === 'pass') {
                    setCookie('login', true);
                    setCookie('user', account);
                    props.setShowUserModal(false);
                    alert('登入成功');
                } else {
                    alert('請確認帳號或密碼');
                }
            }
        }
        if (type === 'signup') {
            if (account && password && username) {
                const result = await userSignupApi(account, password, username);

                if (result === 'ok') {
                    alert('註冊成功');
                    setType('login');
                }
                if (result === 'fail') {
                    alert('帳號已被註冊過');
                }
            } else {
                alert('請完整填寫');
            }
        }
    }

    useEffect(() => {
        setAccount('');
        setPassword('');
        setUsername('');
    }, [type]);

    return (
        <div className={styles['wrap']}>
            <div className={styles['wrap-inner']}>
                <h2>{type === 'login' ? '登入' : '註冊'}</h2>
                {
                    type === 'signup' &&
                    <div className='mb-1'>
                        <label>使用者名稱：</label>
                        <input
                            type="text"
                            value={username}
                            placeholder='請輸入使用者名稱'
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                }
                <div className='mb-1'>
                    <label>{type === 'login' ? '帳號' : '註冊帳號'}：</label>
                    <input
                        type="text"
                        value={account}
                        placeholder={type === 'login' ? '請輸入帳號' : '請輸入註冊帳號'}
                        onChange={(event) => setAccount(event.target.value)}
                    />
                </div>
                <div className='mb-1'>
                    <label>{type === 'login' ? '密碼' : '註冊密碼'}：</label>
                    <input
                        type="password"
                        value={password}
                        placeholder={type === 'login' ? '請輸入密碼' : '請輸入註冊密碼'}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className={styles.btns}>
                    <a
                        className='btn'
                        onClick={clickButton}
                    >{type === 'login' ? '登入' : '註冊'}</a>
                    <a
                        className='btn'
                        onClick={() => props.setShowUserModal(false)}
                    >取消</a>
                </div>
                {
                    type === 'login' &&
                    <div>
                        <p className='fz-12'>
                            還未有帳號？
                            <span
                                className="blue"
                                onClick={() => setType('signup')}
                            >立即註冊</span>
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}