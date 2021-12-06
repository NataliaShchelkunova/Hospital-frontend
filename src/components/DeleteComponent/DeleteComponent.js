import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./deleteComponent.scss";

const style = {
  margin: "14% 20%",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  padding: 0,
};

const DeleteComponent = ({
  stateModalWindowDelete,
  idTask,
  closeModalWindows,
  setReceptions,
}) => {
  console.log(stateModalWindowDelete, idTask, closeModalWindows, setReceptions);

  const deleteFunction = async () => {
    await axios
      .delete(`http://localhost:9000/deleteOneReception?_id=${idTask}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        closeModalWindows();
        setReceptions(res.data.data);
      });
  };

  return (
    <div>
      <Modal
        open={stateModalWindowDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-window-head">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Удалить приём
            </Typography>
          </div>
          <div className="modal-window-body">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Вы действительно хотите удалить приём?
            </Typography>
          </div>
          <div className="button-container-modal-window">
            <Button
              className="cancel-button"
              onClick={() => closeModalWindows()}
            >
              Cancel
            </Button>
            <Button
              className="save-button"
              onClick={() => deleteFunction()}
              autoFocus
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteComponent;
