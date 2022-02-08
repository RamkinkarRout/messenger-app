import React, { useCallback } from "react";
import { Alert, Button, Drawer, Icon } from "rsuite";
import Dashboard from ".";
import { isOfflineForDatabase } from "../context/profile.context";
import { useMediaQuery, useModelState } from "../misc/custom-hook";
import { auth, database } from "../misc/firebase";

const DashboardToggle = () => {
  const { isOpen, open, close } = useModelState();
  const isMobile = useMediaQuery("( max-width : 992px )");

  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        Alert.info("Signed Out", 4000);
        close();
      })
      .catch((err) => {
        Alert.error(err.message, 4000);
      });
    // .onDisconnect()
    // .set(isOfflineForDatabase)
    // .then(() => {
    //  database.ref.set(isOnlineForDatabase);
    // });
  }, [close]);

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon={"dashboard"} />
        <span> Dashboard</span>
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
