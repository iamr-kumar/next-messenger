import Head from "next/head";
import Sidebar from "./../components/Sidebar";
import styled from "styled-components";

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
