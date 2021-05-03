import Head from "next/head";
import Sidebar from "./../components/Sidebar";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Next Messenger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <ChatContainer>
        <h2>Enter an email to start chatting...</h2>
        <StartChatButton>Start Chat</StartChatButton>
      </ChatContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;

  > h2 {
    font-family: "Roboto", sans-serif;
    color: gray;
    font-weight: 200;
  }
`;

const StartChatButton = styled(Button)`
  &&& {
    padding: 10px;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0.2, 0.2);
  }
`;
