import React from "react";
import { Button, Drawer, Icon } from "rsuite";
import Dashboard from ".";
import { useModelState } from "../misc/custom-hook";

const DashboardToggle = () => {
  const { isOpen, open, close } = useModelState();

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon={"dashboard"} />
        <span> Dashboard</span>
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
