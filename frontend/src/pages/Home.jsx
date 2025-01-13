import { chatStore } from "../../store/chatStore";
import ChatBox from "../components/ChatBox";
import NoChatBox from "../components/NoChatBox";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const { selectedUser } = chatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center px-4 pt-20">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-6xl h-[calc(100vh-6rem)]">
          <div className="flex h-full overflow-hidden rounded-lg">
            <Sidebar />
            {!selectedUser ? <NoChatBox /> : <ChatBox />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
