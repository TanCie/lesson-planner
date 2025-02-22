import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const EditableTable = () => {
  const [data, setData] = useState([
    { label: "Subject", value: "" },
    { label: "Grade Level", value: "" },
    { label: "Key Concepts", value: "" },
  ]);

  const handleChange = (index, newValue) => {
    const newData = [...data];
    newData[index].value = newValue;
    setData(newData);
  };

  return (
    <Table className="w-full border rounded-lg">
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.label}:</TableCell>
            <TableCell>
              <Input
                value={row.value}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EditableTable;
