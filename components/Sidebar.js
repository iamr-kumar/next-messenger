import styled from "styled-components";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import { useState } from "react";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user?.email);

  const [chatsSnapshot] = useCollection(userChatRef);
  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter();

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for a user you want to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      input !== user.email &&
      !checkChatExists(input)
    ) {
      // check if chat doesnt already exist and is valid
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const signOut = async () => {
    await auth.signOut();
    router.push("/login");
  };

  const checkChatExists = (recipientEmail) => {
    return !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL} onClick={() => router.push("/")} />
        <IconsContainer>
          <IconButton onClick={createChat}>
            <ChatIcon />
          </IconButton>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={signOut}>Logout</MenuItem>
          </Menu>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; //IE and Edge
  scrollbar-width: none; //Firefox
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    //effect on the whole element on hovering
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    // increase the priority
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
