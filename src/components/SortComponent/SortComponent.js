import React, { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import "./sortComponent.scss";

const SortAppointmentsComponent = ({ receptions, setReceptions }) => {
  const [sortParams, setSortParams] = useState({
    field: "_id",
    direction: "asc",
  });

  const sortBy = [
    {
      inputName: "Имя",
      value: "namePatient",
    },
    {
      inputName: "Доктор",
      value: "doctorName",
    },
    {
      inputName: "Дата",
      value: "newDate",
    },
    {
      inputName: "None",
      value: "_id",
    },
  ];

  const sortDirectionsVariant = [
    {
      value: "asc",
      label: "По возрастанию",
    },
    {
      value: "desc",
      label: "По убыванию",
    },
  ];

  const { field, direction } = sortParams;
  const sortCollection = (sortBySetData, sortDirection) => {
    console.log(
      sortBySetData,
      sortDirection,
      receptions[0].newDate < receptions[2].newDate
    );
    receptions.sort((a, b) =>
      a[sortBySetData] > b[sortBySetData]
        ? 1
        : a[sortBySetData] < b[sortBySetData]
        ? -1
        : 0
    );
    if (sortDirection === "desc") receptions.reverse();
    setReceptions([...receptions]);
  };

  const handleChange = (value) => {
    setSortParams({ ...sortParams, field: value });
    sortCollection(value, direction);
  };

  const handleChangeDirection = (value) => {
    setSortParams({ ...sortParams, direction: value });
    sortCollection(field, value);
  };

  return (
    <div className="sort-style">
      <div className="sort-component">
        <p>Cортировать по:</p>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={field}
          name="sortReceptions"
          onChange={(e) => handleChange(e.target.value)}
          className="input-space"
        >
          {sortBy.map((element, index) => (
            <MenuItem key={`id${index}`} value={element.value}>
              {element.inputName}
            </MenuItem>
          ))}
        </Select>
      </div>
      {field && field !== "_id" && (
        <div className="sort-component-type">
          <p>Направление:</p>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={direction}
            onChange={(e) => handleChangeDirection(e.target.value)}
            className="input-space"
          >
            {sortDirectionsVariant.map((element, index) => (
              <MenuItem key={`id${index}`} value={element.value}>
                {element.label}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
};

export default SortAppointmentsComponent;
