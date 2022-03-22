import React, { useState, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";
// recoil 사용
import { useRecoilValue } from "recoil";
import { isEditingState } from "./UserAtom";

function User({ portfolioOwnerId, isEditable }) {
  // isEditing 상태를 생성함.
  const isEditing = useRecoilValue(isEditingState);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <UserEditForm user={user} setUser={setUser} />
      ) : (
        <UserCard user={user} isEditable={isEditable} />
      )}
    </>
  );
}

export default User;
