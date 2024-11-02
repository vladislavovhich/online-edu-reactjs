import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { getUser } from "../store/slices/user-profile.slice";

export const useUserProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams<{ userId: string }>();
    const { user: userAuthorized, isAuthorized } = useSelector(
        (state: RootState) => state.auth
    );
    const { user: profileUser } = useSelector(
        (state: RootState) => state.userProfile
    );

    const userId = params.userId ? parseInt(params.userId) : null;

    useEffect(() => {
        if (!userId || isNaN(userId)) {
            return;
        }

        if (
            (profileUser &&
                userAuthorized &&
                userAuthorized.id != profileUser.id &&
                profileUser.id != userId) ||
            !profileUser ||
            (userAuthorized && userId != userAuthorized.id)
        ) {
            dispatch(getUser(userId));
        }
    }, [userId, dispatch, isAuthorized]);

    const user = userId ? profileUser : userAuthorized;

    return {
        user,
        userAuthorized,
        isAuthorized,
        userId,
        isProfileOwner: userAuthorized?.id === profileUser?.id,
    };
};
