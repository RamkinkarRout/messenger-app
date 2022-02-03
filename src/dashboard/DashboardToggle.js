import React, { useCallback } from "react";
import { Alert, Button, Drawer, Icon } from "rsuite";
import Dashboard from ".";
import { useMediaQuery, useModelState } from "../misc/custom-hook";
import { auth } from "../misc/firebase";

const DashboardToggle = () => {
  const { isOpen, open, close } = useModelState();
  const isMobile = useMediaQuery("( max-width : 992px )");

  const onSignOut = useCallback(() => {
    auth.signOut();
    Alert.info("Signed Out", 4000);
    close();
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
