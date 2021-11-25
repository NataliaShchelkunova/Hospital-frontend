import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import logo from "../../icons/Vector.svg";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TableComponent from "./TableComponent/TableComponent";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "./MainComponent.scss";

const MainComponent = () => {
  const [receptions, setReceptions] = useState([]);

  const [data, setData] = useState({
    namePatient: "",
    doctorName: "",
    newDate: moment(new Date()).format("DD.MM.YYYY"),
  });

  const doctorNames = [
    {
      value: "Ricova Irina Ivanovna",
    },
    {
      value: "Ten Alexandr Dmitrievich",
    },
    {
      value: "Shunko Eva Andrevna",
    },
  ];

  const { namePatient, doctorName, newDate, complaints } = data;

  const handleChange = (inputName, value) => {
    setData({
      ...data,
      [inputName]: value,
    });
  };

  useEffect(() => {
    axios.get("http://localhost:9000/getAllReception").then((res) => {
      setReceptions(res.data.data);
    });
  }, []);

  const addNewReception = async (req, res) => {
    data.newDate = moment(data.newDate).format("DD.MM.YYYY");
    try {
      await axios
        .post("http://localhost:9000/createNewReception", data)
        .then((res) => {
          receptions.push(res.data.data);
          setReceptions([...receptions]);
          setData({
            namePatient: "",
            newDate: moment(new Date()).format("DD/MM/YYYY"),
            complaints: "",
          });
        });
    } catch (error) {
      res.status(404).send("Error");
    }
  };

  return (
    <div>
      <div>
        <header>
          <img alt="" src={logo} />
          <h1 className="header-text">Приёмы </h1>
          <button>Выход</button>
        </header>
      </div>
      <div className="text-and-input-container">
        <div className="input-container">
          <div className="text-input-patient-name-container">
            <div className="name-patient">Имя:</div>
            <TextField
              required
              value={namePatient || ""}
              id="outlined-required"
              name="namePatient"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>

          <div className="text-input-doctor-container">
            <div className="name-doctor">Врач:</div>
            <FormControl>
              <Select
                value={doctorName || ""}
                name="doctorName"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {doctorNames.map((item, index) => (
                  <MenuItem key={`item-${index}`} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="text-input-date-container">
            <div className="date-input">Дата:</div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat={"dd/MM/yyyy"}
                name="date"
                value={newDate || new Date()}
                onChange={(e) => handleChange("newDate", e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="text-input-complaints-container">
            <div className="complaints-input">Жалобы:</div>
            <div className="one-line-button-and-input">
              <TextField
                required
                value={complaints || ""}
                id="outlined-required"
                name="complaints"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <button
                disabled={
                  namePatient && newDate && complaints && doctorNames
                    ? false
                    : true
                }
                className="add-information"
                onClick={() => {
                  addNewReception();
                }}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <TableComponent receptions={receptions} />
      </div>
    </div>
  );
};

export default MainComponent;
