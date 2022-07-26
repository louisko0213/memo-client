import styles from '../styles/index.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { getMemoListByUserApi } from './api/memo';
import { formatDate } from '../lib/utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '../components/modal';
import UserModal from '../components/userModal';
import { getCookie, deleteCookie, setCookie } from 'cookies-next';

export default function Home({ memoData }) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userModalType, setUserModalType] = useState('');
  const [memoList, setMemoList] = useState(memoData);
  const [showModal, setShowModal] = useState(false);
  const [needPassword, setNeedPassword] = useState(false);
  const [memoId, setMemoId] = useState();
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    const loginStatus = getCookie('login');
    setIsLogin(loginStatus);
  })

  useEffect(() => {
    (async () => {
      const user = getCookie('user');
      const data = await getMemoListByUserApi(user);
      setMemoList(data);
    })();
  }, [isLogin])

  const signup = () => {
    setShowUserModal(true);
    setUserModalType('signup');
  }

  const login = async () => {
    setShowUserModal(true);
    setUserModalType('login');
  }

  const logout = () => {
    setCookie('login', false);
    deleteCookie('user');
    setIsLogin(false);
  }

  const updateMemo = async (id, password) => {
    if (password) {
      setMemoId(id);
      setShowModal(true);
      setNeedPassword(true);
      setModalType('update');
    } else {
      router.push('/update/[id]', `/update/${id}`);
    }
  }

  const deleteMemo = async (id, password) => {
    if (password) setNeedPassword(true);
    setMemoId(id);
    setShowModal(true);
    setModalType('delete');
  }

  const refreshMemoList = () => {
    setMemoList(memoList.filter(value => value.id !== memoId));
  }

  return (
    <div className='positionr container'>
      <div className={styles.wrap}>
        <div className='positionr d-flex'>
          <h1 className='text-center margin-center'>備忘錄</h1>
          <div className={`positiona ${styles.buttons}`}>
            {
              isLogin ?
                <>
                  <Link href='/create'>
                    <a className={`btn ${styles.new}`}>新增</a>
                  </Link>
                  <a
                    className='btn'
                    onClick={logout}
                  >登出</a>
                </>
                :
                <>
                  <a
                    className='btn'
                    onClick={login}
                  >登入</a>
                  <a
                    className='btn'
                    onClick={signup}
                  >註冊</a>
                </>
            }
          </div>
        </div>
        <div className={styles['memo-list']}>
          {
            isLogin ?
              memoList.length ?
                memoList.map((memo, index) => (
                  <div
                    className={`${styles['memo-item']} positionr`}
                    key={index}
                  >
                    <div className='ml-2'>
                      <h2>
                        <span className={`${styles.lock} positiona`}>
                          {
                            memo.password &&
                            <Image
                              src='/image/lock.png'
                              width={20}
                              height={20}
                            />
                          }
                        </span>
                        {memo.title}
                      </h2>
                      <div className={styles['memo-content']}>
                        <p>{memo.password ? '已鎖定' : memo.content}</p>
                      </div>
                      <p className={`gray fz-12 positiona ${styles['memo-date']}`}>{formatDate(new Date(memo.date))}</p>
                      <div
                        className={`positiona ${styles.amend}`}
                        onClick={() => updateMemo(memo.id, memo.password)}
                      >
                        <Image
                          src='/image/amend.webp'
                          width={20}
                          height={20}
                        />
                      </div>
                      <div
                        className={`positiona ${styles.delete}`}
                        onClick={() => deleteMemo(memo.id, memo.password)}
                      >
                        <Image
                          src='/image/delete.png'
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                ))
                :
                <div className={`gray text-center ${styles.blank}`}>還未新增備忘錄...</div>
              :
              <div className={`gray text-center ${styles.blank}`}>請先登入...</div>
          }
        </div>
        {showModal && <Modal
          id={memoId}
          modalType={modalType}
          setShowModal={setShowModal}
          needPassword={needPassword}
          setNeedPassword={setNeedPassword}
          refreshMemoList={refreshMemoList}
        />}
        {showUserModal && <UserModal
          userModalType={userModalType}
          setShowUserModal={setShowUserModal}
        />}
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  const user = getCookie('user', { req, res });
  const memoData = await getMemoListByUserApi(user);

  return {
    props: {
      memoData: memoData
    }
  }
}