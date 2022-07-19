import styles from '../styles/index.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { getMemoListApi } from './api/all';
import { formatDate } from '../lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '../components/modal';

export default function Home({ memoData }) {
  const router = useRouter();
  const [memoList, setMemoList] = useState(memoData);
  const [showModal, setShowModal] = useState(false);
  const [needPassword, setNeedPassword] = useState(false);
  const [memoId, setMemoId] = useState();
  const [modalType, setModalType] = useState('');

  const updateMemo = async (id, password) => {
    if (password) {
      setMemoId(id);
      setShowModal(true);
      setNeedPassword(true);
      setModalType('update');
    } else {
      router.push(`/update/${id}`);
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
      <Link href='/create'>
        <a className={`${styles['new-btn']} positiona`}>新增</a>
      </Link>
      <h1 className='text-center'>備忘錄</h1>
      <div className={styles['memo-list']}>
        {
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
    </div>
  )
}

export const getServerSideProps = async () => {
  const memoData = await getMemoListApi();

  return {
    props: {
      memoData: memoData
    }
  }
}