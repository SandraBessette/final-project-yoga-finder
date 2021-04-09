import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import MessageItem from "./MessageItem";
import { MdSend } from "react-icons/md";
import { SiWechat } from "react-icons/si";
import { IoIosArrowDropleft } from "react-icons/io";
import { COLORS } from "../../../GlobalStyles";
import { onSmallTabletMediaQuery } from "../../../utils/responsives";
import IconButton from "../../../components/button/IconButton";
import ProfileInfo from "../../singleBusiness/components/ProfileInfo";
import Spinner from "../../../components/spinner/Spinner";
import Error from "../../error/Error";
import {
    receiveMessageInfo,
    updateMessage,
    updateSelectedChat,
} from "../../../store/reducers/chat/actions";

const Messages = ({ singleUser }) => {
    const { authData } = useSelector((state) => state.auth);
    const { selected, messages } = useSelector((state) => state.chat);
    const [status, setStatus] = useState("loading");
    const [ready, setReady] = useState(true);
    const [error, setError] = useState("");
    const [messageText, setMessageText] = useState("");
    const [unreadStyle, setUnreadStyle] = useState(true);
    const messagesEndRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (ev) => {
        setMessageText(ev.target.value);
    };
    const handleClickChat = (ev) => {
        ev.preventDefault();
        dispatch(updateSelectedChat({ chatId: null, user: null }));
        if (singleUser) history.push("/user/chat/");
    };

    const classString = () => {
        let name = null;
        if (selected.chatId && singleUser) name = "selected singleUser";
        else if (selected.chatId) name = "selected";
        else if (singleUser) name = "singleUser";
        return name;
    };

    const handleSendClick = (e) => {
        e.preventDefault();
        if (messageText === "") {
            return;
        }
        setReady(false);
        fetch(`${process.env.REACT_APP_API_URL}/chat/message/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${authData?.token}`,
            },
            body: JSON.stringify({
                receiverId: selected.user._id,
                message: messageText,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                const { status, data } = json;
                if (status === 201) {
                    setMessageText("");
                    if (!selected.chatId) {
                        const user =
                            data.chat.users[0]._id === authData.data._id
                                ? data.chat.users[1]
                                : data.chat.users[0];
                        dispatch(
                            updateSelectedChat({
                                chatId: data.chat._id,
                                user: user,
                            })
                        );
                    }
                    dispatch(updateMessage(data.message, data.chat));
                    setUnreadStyle(false);
                    setReady(true);
                } else {
                    setError(status.toString());
                    setStatus("error");
                    console.log(json.message);
                    setReady(true);
                }
            })
            .catch((error) => {
                setError("500");
                setStatus("error");
                console.log("error", error);
                setReady(true);
            });
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [status, messages]);

    useEffect(() => {
        if (selected.chatId) {
            setStatus("loading");
            fetch(
                `${process.env.REACT_APP_API_URL}/chat/messages/${selected.chatId}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authData?.token}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((json) => {
                    const { status, data } = json;
                    if (status === 200) {
                        dispatch(receiveMessageInfo(data));
                        setStatus("idle");
                    } else {
                        setError(status.toString());
                        setStatus("error");
                        console.log(json.message);
                    }
                })
                .catch((error) => {
                    setError("500");
                    setStatus("error");
                });
        } else {
            setStatus("idle");
        }
    }, [authData?.token, dispatch, selected.chatId]);

    if (status === "error") {
        return <Error type={error} />;
    }
    return (
        <>
            <Wrapper className={classString()}>
                {status === "loading" && <Spinner />}
                {status === "idle" && (
                    <>
                        {selected.user === null ? (
                            <WrapperNoMessages>
                                <p>Messages</p>
                                <SiWechat size={200} />
                            </WrapperNoMessages>
                        ) : (
                            <>
                                <Header>
                                    <IconWrapper
                                        className={
                                            singleUser ? "singleUser" : null
                                        }
                                    >
                                        <IconButton
                                            margin="0 2px 0 0"
                                            padding="0px"
                                            onclick={handleClickChat}
                                        >
                                            <IoIosArrowDropleft size={22} />
                                        </IconButton>
                                    </IconWrapper>
                                    <ProfileInfo
                                        disabled={true}
                                        user={selected.user}
                                    ></ProfileInfo>
                                </Header>
                                <WrapperMessages>
                                    {messages.map((message, index) => {
                                        return (
                                            <MessageItem
                                                key={message._id}
                                                reference={
                                                    index === 0
                                                        ? messagesEndRef
                                                        : null
                                                }
                                                message={message}
                                                sender={
                                                    message.sender._id ===
                                                    authData.data._id
                                                }
                                                unreadStyle={unreadStyle}
                                            />
                                        );
                                    })}
                                </WrapperMessages>
                                <Footer>
                                    <textarea
                                        type="text"
                                        autoComplete="off"
                                        name="fname"
                                        value={messageText}
                                        onChange={handleChange}
                                    />
                                    <IconButton
                                        margin="0 2px 0 0"
                                        padding="5px"
                                        disabled={!ready}
                                        onclick={handleSendClick}
                                    >
                                        <MdSend size={22} />
                                    </IconButton>
                                </Footer>
                            </>
                        )}{" "}
                    </>
                )}
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    border: 1px solid ${COLORS.lightGray};
    height: 100%;

    padding: 0;
    box-sizing: border-box;
    overflow-y: auto;

    //Firefox
    scrollbar-color: ${COLORS.lightGray} transparent;
    scrollbar-width: thin;

    //Chrome
    &::-webkit-scrollbar {
        width: 6px;
        background: transparent;
    }

    &:hover::-webkit-scrollbar {
        &-thumb {
            background: ${COLORS.lightGray};
            border-radius: 15px;
        }
    }

    &::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 15px;
    }

    ${onSmallTabletMediaQuery()} {
        display: none;
        &.singleUser {
            display: block;
        }

        &.selected {
            display: block;
        }

        &::-webkit-scrollbar {
            width: 8px;
        }
        border: none;
    }
`;

const WrapperMessages = styled.div`
    display: flex;
    flex-direction: column-reverse;
    min-height: calc(100% - 65px);
    width: 100%;
    border-radius: 10px;
    padding: 10px 0;
    box-sizing: border-box;
`;

const WrapperNoMessages = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #cbbae5;

    height: 100%;
    width: 100%;
    border-radius: 10px;
    padding: 10px 0;
    box-sizing: border-box;

    & p {
        color: ${COLORS.primary};
    }
`;

const Footer = styled.div`
    height: 65px;
    -webkit-backdrop-filter: blur(40px);
    backdrop-filter: blur(40px);
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    bottom: 0;
    width: 100%;

    & textarea {
        height: 35px;
        width: 90%;
        border-radius: 15px;
        border: solid 2px lightgray;
        margin: 10px;
        outline: none;
        padding: 7px 10px;
        font-size: 13px;
        resize: none;

        &:focus {
            box-shadow: 0 0 5px ${COLORS.primary};
            border: 1px solid ${COLORS.primary};
        }
    }
`;

const IconWrapper = styled.div`
    margin: 0 25px 0 0;
    display: none;
    &.singleUser {
        display: flex;
        align-items: center;
    }

    ${onSmallTabletMediaQuery()} {
        display: flex;
        align-items: center;
    }
`;

const Header = styled.div`
    display: flex;
    height: 65px;
    -webkit-backdrop-filter: blur(40px);
    backdrop-filter: blur(40px);
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 4;
    padding-top: 7px;
    padding-left: 10px;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    border-bottom: 1px solid ${COLORS.lightGray};
`;

export default Messages;
