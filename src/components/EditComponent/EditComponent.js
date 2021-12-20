import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import "./editComponent.scss";

const EditComponent = ({ oneTask, closeModalWindows, setReceptions }) => {
  const history = useHistory();
  const { _id, namePatient, doctorName, newDate, complaints } = oneTask;

  const converDate = (date) => {
    const temp = date.split(".");
    [temp[0], temp[1]] = [temp[1], temp[0]];
    return temp.join("-");
  };

  const [data, setData] = useState({
    newNameReceptions: namePatient,
    newDoctorReceptions: doctorName,
    newDateReceptions: converDate(newDate),
    newComplaintReceptions: complaints,
  });

  const doctorNames = [
    {
      value: "Бейдин Артем",
    },
    {
      value: "Ракитина Екатерина",
    },
    {
      value: "Марченко Андрей",
    },
  ];

  const {
    newNameReceptions,
    newDoctorReceptions,
    newDateReceptions,
    newComplaintReceptions,
  } = data;

  const handleChange = (inputName, value) => {
    setData({
      ...data,
      [inputName]: value,
    });
  };

  const saveReceptions = async () => {
    data.newDateReceptions = moment(data.newDateReceptions).format(
      "DD.MM.YYYY"
    );

    await axios
      .patch(
        "http://localhost:9000/editOneReception",
        {
          _id,
          namePatient: newNameReceptions,
          doctorName: newDoctorReceptions,
          newDate: data.newDateReceptions,
          complaints: newComplaintReceptions,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        closeModalWindows();
        setReceptions(res.data.data);
      });
  };

  const validateForToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/autorisation");
    }
  };

  validateForToken();

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-window">
          <div className="modal-window-head">
            <Typography
              className="head-modal-window"
              component={"span"}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Изменить приём
            </Typography>
          </div>

          <Typography
            component={"span"}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <div className="text-and-input-modal-container">
              <div className="input-container">
                <div className="text-input-patient-name-container">
                  <div className="text">Имя:</div>
                  <TextField
                    fullWidth
                    className="name-patient name-patient-modal"
                    required
                    value={newNameReceptions || ""}
                    id="outlined-required-modal"
                    name="newNameReceptions"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </div>

                <div className="text-input-doctor-container">
                  <div className="text">Врач:</div>
                  <FormControl className="name-doctor">
                    <Select
                      fullWidth
                      className="name-doctor"
                      value={newDoctorReceptions || ""}
                      name="newDoctorReceptions"
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    >
                      {doctorNames.map((item, index) => (
                        <MenuItem
                          key={`item-${index}`}
                          value={item.value}
                          className="test"
                        >
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="text-input-date-container">
                  <div className="text">Дата:</div>
                  <LocalizationProvider
                    fullWidth
                    className="date-input"
                    dateAdapter={AdapterDateFns}
                  >
                    <DesktopDatePicker
                      className="date-input"
                      inputFormat={"dd/MM/yyyy"}
                      minDate={new Date("01-01-2021")}
                      maxDate={new Date("12-31-2022")}
                      name="newDateReceptions"
                      value={newDateReceptions}
                      onChange={(e) => handleChange("newDateReceptions", e)}
                      renderInput={(params) => (
                        <TextField className="date-file" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>

                <div className="text-input-complaints-container">
                  <div className="text">Жалобы:</div>
                  <div className="one-line-button-and-input">
                    <TextField
                      fullWidth
                      className="one-complaints-input"
                      required
                      value={newComplaintReceptions || ""}
                      id="outlined-required"
                      name="newComplaintReceptions"
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Typography>
          <div className="button-container-modal-window">
            <Button
              className="cancel-button"
              onClick={() => closeModalWindows()}
            >
              Cancel
            </Button>
            <Button
              className="save-button"
              onClick={() => saveReceptions()}
              autoFocus
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditComponent;
