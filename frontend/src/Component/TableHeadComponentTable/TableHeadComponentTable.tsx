import {TableCell, TableHead, TableRow} from "@mui/material";

type TableHeadComponentProps = {
    cells: {cellName:string, align:"center" | "left" | "right" | "justify" | "inherit" | undefined}[]
}
export default function TableHeadComponentTable(props: TableHeadComponentProps) {
    return (
            <TableHead>
                <TableRow>
                    {props.cells.map(cell => <TableCell key={cell.cellName} align ={cell.align} >{cell.cellName}</TableCell>)}
                </TableRow>
            </TableHead>
    )
}
