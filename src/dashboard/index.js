import React from "react";
import { Button, Divider, Drawer } from "rsuite";
import { EditableInput } from "../components/EditableInput";
import { useProfile } from "../context/profile.context";

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = (newData) => {
    console.log(newData);
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <Divider />
        <EditableInput
          initialValue={profile.name}
          onSave={onSave}
          name="nickname"
          label={<h6 className="mb-2">Nickname</h6>}
        />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
