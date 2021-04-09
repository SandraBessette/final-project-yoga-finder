import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import moment from "moment";
import { COLORS } from "../../../GlobalStyles";

const ChatListItem = ({ id, handleClick, date, lastMessage, user }) => {
    const { count, selected } = useSelector((state) => state.chat);

    return (
        <Wrapper className={selected.chatId === id ? "selected" : null}>
            <ProfilImage src={user.image || "/user.svg"} atl="userProfile" />
            <TextWrapper onClick={(e) => handleClick(e, id, user)}>
                <DatePar>{moment(date).fromNow()}</DatePar>
                <p>{user.userName}</p>
                <MessageWrapper>
                    <Message>
                        {lastMessage.receiver === user._id
                            ? `You: ${lastMessage.message}`
                            : lastMessage.message}
                    </Message>
                    {count[id] !== undefined && count[id] !== 0 && (
                        <Unread>{count[id]}</Unread>
                    )}
                </MessageWrapper>
            </TextWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.button`
    background: ${(p) => (p.selected ? COLORS.primaryLight : "none")};
    border: 1px solid #f8f8f8;
    border-top: none;
    padding: 7px;
    border-radius: 10px;

    display: flex;
    align-items: center;
    font-size: 14px;
    box-sizing: border-box;
    cursor: pointer;
    outline: none;

    &:hover {
        background-color: #f2f2f2;
    }

    &.selected {
        background-color: ${COLORS.primaryLight};
    }
`;

const ProfilImage = styled.img`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-right: 10px;
`;

const TextWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    box-sizing: border-box;
    & p {
        margin: 2px;
    }
`;
const Message = styled.p`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 220px;

    font-size: 11px;
    color: grey;
`;

const DatePar = styled.p`
    position: absolute;
    top: -10px;
    right: 0;
    color: grey;
    font-size: 9px;
`;

const Unread = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: ${COLORS.primary};
    color: white;
    font-size: 9px;
    font-weight: 600;
`;

const MessageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export default ChatListItem;
