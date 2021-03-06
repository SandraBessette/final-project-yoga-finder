import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { HEADER_HEIGHT, HEADER_HEIGHT_SMALL } from "../../GlobalStyles";
import UserHeader from "../../components/userHeader/UserHeader";
import Spinner from "../../components/spinner/Spinner";
import Error from "../error/Error";
import Messages from "./components/Messages";
import ChatList from "./components/ChatList";
import { onSmallTabletMediaQuery } from "../../utils/responsives";
import {
    requestChatListInfo,
    receiveChatListInfo,
    receiveChatListInfoError,
} from "../../store/reducers/chat/actions";

const Chat = () => {
    const { authData } = useSelector((state) => state.auth);
    const { status, error } = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestChatListInfo());
        fetch(`${process.env.REACT_APP_API_URL}/chat`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${authData?.token}`,
            },
        })
            .then((res) => res.json())
            .then((json) => {
                const { data } = json;
                if (json.status === 200) {
                    dispatch(receiveChatListInfo(data));
                } else {
                    dispatch(receiveChatListInfoError(json.status.toString()));
                }
            })
            .catch((error) => {
                dispatch(receiveChatListInfoError("500"));
            });
    }, [authData?.token, dispatch]);

    if (status === "error") {
        return <Error type={error} />;
    }

    return (
        <Wrapper>
            <UserHeader title="Chat" />
            {status === "loading" && <Spinner />}
            {status === "idle" && (
                <MainWrapper>
                    <ChatList />
                    <Messages singleUser={false} />
                </MainWrapper>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    height: calc(100vh - ${HEADER_HEIGHT});
    font-size: 15px;

    ${onSmallTabletMediaQuery()} {
        height: calc(100vh - ${HEADER_HEIGHT_SMALL});
    }
`;

const MainWrapper = styled.div`
    align-self: center;
    width: 100%;
    max-width: 1200px;

    padding: 20px;
    display: flex;
    align-items: center;
    height: calc(100vh - ${HEADER_HEIGHT} - 100px);

    ${onSmallTabletMediaQuery()} {
        justify-content: center;
        padding: 0 2px 10px 0;
        height: calc(100vh - ${HEADER_HEIGHT_SMALL} - 85px);
    }
`;
export default Chat;
