import React from "react";
import editImage from "../../../icons/edit.svg";
import deleteImage from "../../../icons/delete.svg";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import "./tableComponent.scss";

const TableComponent = ({ receptions }) => {
  const headTable = ["Имя", "Врач", "Дата", "Жалобы"];

  const editFunction = (index) => {};

  const deleteFunction = (index) => {};

  return (
    <div className="all-reception-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
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
          <TableBody>
            {receptions.map((datas, index) => (
              <TableRow key={index}>
                <TableCell align="center" component="th" scope="row">
                  {datas.namePatient}
                </TableCell>
                <TableCell align="center">{datas.doctorName}</TableCell>
                <TableCell align="center">{datas.newDate}</TableCell>
                <TableCell align="center">{datas.complaints}</TableCell>
                <TableCell align="center">
                  <img
                    alt=""
                    src={deleteImage}
                    onClick={() => deleteFunction(index)}
                  />
                </TableCell>
                <TableCell className="edit-table" align="center">
                  <img
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
