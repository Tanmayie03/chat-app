import { useEffect, useRef } from "react";
import { chatStore } from "../../store/chatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { authStore } from "../../store/authStore";
import { formatMessageTime } from "../../lib/utils";

const ChatBox = () => {
  const {
    messages,
    getMessages,
    listenMessages,
    doNotListenMessages,
    isMessagesLoading,
    selectedUser,
  } = chatStore();
  const { authUser } = authStore();
  const messageEndRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id);

    listenMessages();

    return () => doNotListenMessages();
  }, [selectedUser._id, getMessages, listenMessages, doNotListenMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col flex-1 overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />
      <div
        className="flex-1 p-4 space-y-4 overflow-y-auto "
        style={{
          backgroundImage: "url('/outputbg.png')",
        }}>
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat  ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}>
            <div className=" chat-image avatar">
              <div className="border rounded-full size-10">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                />
              </div>
            </div>
            <div className="mb-1 chat-header">
              <time className="ml-1 text-xs opacity-50">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="flex flex-col chat-bubble">
              {message.image && (
                <img
                  src={message.image}
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}{" "}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatBox;
