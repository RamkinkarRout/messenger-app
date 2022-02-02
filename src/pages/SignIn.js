import React from "react";
import firebase from "firebase/app";
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from "rsuite";
import { auth, database } from "../misc/firebase";

export const SignIn = () => {
  const signInWithProvider = async (provider) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo.isNewUser) {
        database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success("Signed In", 4000);
    } catch (err) {
      Alert.info(err.message, 4000);
    }
  };

  const onFacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };
  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome Messenger chat</h2>
                <p>Progreesive chat platform by Ram</p>
              </div>
              <div className="mt-3">
                <Button block color="blue" onClick={onFacebookSignIn}>
                  <Icon icon="facebook" />
                  <span className="ml-1">Continue with Facebook</span>
                </Button>
                <Button block color="green" onClick={onGoogleSignIn}>
                  <Icon icon="google" />
                  <span className="ml-1">Continue with Google</span>
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};
