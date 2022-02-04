import React from "react";
import { Alert, Button, Divider, Drawer } from "rsuite";
import { EditableInput } from "../components/EditableInput";
import { useProfile } from "../context/profile.context";
import { database } from "../misc/firebase";

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async (newData) => {
    const databaseNameRef = database
      .ref(`/profiles/${profile.uid}`)
      .child("name");

    try {
      await databaseNameRef.set(newData);
      Alert.success("Nicname has been updated", 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
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
