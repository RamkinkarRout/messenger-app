import React, { useState } from "react";
import { useParams } from "react-router";
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from "rsuite";
import { useModelState } from "../../../misc/custom-hook";
import { storage } from "../../../misc/firebase";

const MAX_FILE_SIZE = 1000 * 1024 * 5;

const AttachmenentBtnModal = ({ afterUpload }) => {
  const { chatId } = useParams();
  const { isOpen, close, open } = useModelState();
  const [isLoading, setisLoading] = useState(false);

  const [fileList, setFileList] = useState([]);

  const onChange = (fileArr) => {
    const filtered = fileArr
      .filter((el) => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);
    setFileList(filtered);
  };

  const onUpload = async () => {
    try {
      const uploadPromises = fileList.map((f) => {
        return storage
          .ref(`/chat/${chatId}`)
          .child(Date.now() + f.name)
          .put(f.blobFile, {
            cacheControl: `public, max-age ${360 * 24 * 3}`,
          });
      });

      const uploadSnapShots = await Promise.all(uploadPromises);

      const shapePromises = uploadSnapShots.map(async (snap) => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
      });

      const files = await Promise.all(shapePromises);
      await afterUpload(files);
      setisLoading(false);
      close();
    } catch (error) {
      setisLoading(false);
      Alert.error(error.message, 4000);
    }
  };

  return (
    <>
      <InputGroup.Button onClick={open}>
        <Icon icon="attachment" />
      </InputGroup.Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Uploader
            autoUpload={false}
            action=""
            fileList={fileList}
            onChange={onChange}
            multiple
            listType="picture-text"
            className="w-100"
            disabled={isLoading}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={onUpload} disabled={isLoading}>
            send to chat
          </Button>
          <div className="text-right mt-2">
            <small>* only files less than 5 mb are allowed</small>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AttachmenentBtnModal;
