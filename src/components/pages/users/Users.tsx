import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getAllUsersList } from 'store/thunks/userThunk';
import styles from './Users.module.scss';
export default function Users() {
  const bgColor = ['#FAEA73', '#F7CEDC', '#CCEFF6'];
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector((state) => state.user.allUsersList);

  useEffect(() => {
    dispatch(getAllUsersList());
  }, []);
  return (
    <div className={styles.users}>
      <div className="container" data-testid="users">
        <div className={styles.wrapper}>
          {allUsers?.map((user, index) => (
            <div
              className={styles.userCard}
              key={user._id}
              style={{ backgroundColor: bgColor[index < 3 ? index : Math.floor(index % 3)] }}
            >
              <h5>{user.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
