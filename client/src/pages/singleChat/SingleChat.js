import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { HEADER_HEIGHT, HEADER_HEIGHT_SMALL } from "../../GlobalStyles";
import UserHeader from "../../components/userHeader/UserHeader";
import Spinner from "../../components/spinner/Spinner";
import Error from "../error/Error";
import Messages from "../chat/components/Messages";

import { onSmallTabletMediaQuery } from "../../utils/responsives";
import { updateSelectedChat } from "../../store/reducers/chat/actions";

const SingleChat = () => {
    const { authData } = useSelector((state) => state.auth);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(updateSelectedChat({ chatId: null, user: null }));
        };
    }, [dispatch]);

    useEffect(() => {
        setStatus("loading");
        fetch(`${process.env.REACT_APP_API_URL}/chat/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${authData?.token}`,
            },
        })
            .then((res) => res.json())
            .then((json) => {
                const { status, data } = json;
                if (status === 200) {
                    const chat = data.chat ? data.chat._id : null;
                    dispatch(
                        updateSelectedChat({ chatId: chat, user: data.user })
                    );
                    setStatus("idle");
                } else {
                    setError(status.toString());
                    setStatus("error");
                }
            })
            .catch((error) => {
                setError("500");
                setStatus("error");
            });
    }, [authData?.token, dispatch, id]);

    if (status === "error") {
        return <Error type={error} />;
    }

    return (
        <Wrapper>
            <UserHeader title="Chat" />
            {status === "loading" && <Spinner />}
            {status === "idle" && (
                <MainWrapper>
                    <Messages singleUser={true} />
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
    max-width: 800px;
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
export default SingleChat;
