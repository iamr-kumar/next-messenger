import Head from "next/head";
import styled from "styled-components";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const router = useRouter();

  const [user] = useAuthState(auth);

  const signin = async () => {
    await auth.signInWithPopup(provider).catch(alert);
    router.push("/");
  };

  return (
    <div>
      <Container>
        <Head>
          <title>Login</title>
        </Head>
        <LoginContainer>
          <Logo src="/assets/logo.png" />
          <GoogleButton onClick={signin} />
        </LoginContainer>
      </Container>
    </div>
  );
};

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0.7, 0.5);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
