import React from "react";
import { Alert, Button, Divider, Drawer } from "rsuite";
import { EditableInput } from "../components/EditableInput";
import { useProfile } from "../context/profile.context";
import { database } from "../misc/firebase";
import { getUserUpdates } from "../misc/helpers";
import AvatarUploadBtn from "./AvatarUploadBtn";
import ProviderBlock from "./ProviderBlock";

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async (newData) => {
    try {
      // await databaseNameRef.set(newData);

      const updates = await getUserUpdates(
        profile.uid,
        "name",
        newData,
        database
      );

      await database.ref().update(updates);
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
        <ProviderBlock />
        <Divider />
        <EditableInput
          initialValue={profile.name}
          onSave={onSave}
          name="nickname"
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn />
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
