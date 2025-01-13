import { useEffect } from "react";
import { chatStore } from "../../store/chatStore";
import SideBarSkeleton from "./skeletons/SideBarSkeleton";
import { Users } from "lucide-react";
import { authStore } from "../../store/authStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, isUserLoading } = chatStore();
  const { setSelectedUser } = chatStore();
  const { onlineUsers } = authStore();
  // const [showOnlineUser, setShowOnlineUser] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  // const filterUsers = showOnlineUser
  //   ? users.filter((user) => onlineUsers.includes(user._id))
  //   : users;
  if (isUserLoading) return <SideBarSkeleton />;
  return (
    <aside className="flex flex-col w-20 h-full transition-all duration-200 border-r lg:w-72 border-base-300">
      <div className="flex flex-col items-center justify-between w-full p-5 border-b lg:flex-row border-base-300">
        <div className="flex items-center gap-2">
          <Users className="size-5" />
          <span className="hidden font-medium lg:block">Contacts</span>
        </div>
        <div className="items-center hidden gap-2 lg:flex">
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>
      <div className="w-full py-3 overflow-y-auto">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}>
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="object-cover rounded-full lg:size-12"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 bg-green-500 rounded-full size-3 ring-2 ring-zinc-900" />
              )}
            </div>

            <div className="hidden min-w-0 text-left lg:block">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
