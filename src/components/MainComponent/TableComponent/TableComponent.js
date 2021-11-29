import React from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import editImage from "../../../icons/edit.svg";
import deleteImage from "../../../icons/delete.svg";
import "./tableComponent.scss";

const TableComponent = ({ receptions }) => {
  const headTable = ["Имя", "Врач", "Дата", "Жалобы"];

  const editFunction = (index) => {};

  const deleteFunction = (index) => {};

  return (
    <div className="all-reception-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-head">
            <TableRow>
              {headTable.map((element, index) => (
                <TableCell key={`key-${index}`} align="center">
                  {element}
                </TableCell>
              ))}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody className="table-row">
            {receptions.map((datas, index) => (
              <TableRow key={index} className="table-row">
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  className="table-row"
                >
                  {datas.namePatient}
                </TableCell>
                <TableCell align="center" className="table-row">
                  {datas.doctorName}{" "}
                </TableCell>
                <TableCell align="center" className="table-row">
                  {datas.newDate}
                </TableCell>
                <TableCell align="center" className="table-row">
                  {datas.complaints}
                </TableCell>
                <TableCell align="center" className="table-row">
                  <img
                    className="image-for-table"
                    alt=""
                    src={deleteImage}
                    onClick={() => deleteFunction(index)}
                  />
                </TableCell>
                <TableCell className="edit-table" align="center">
                  <img
                    className="image-for-table"
                    alt=""
                    src={editImage}
                    onClick={() => editFunction(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
