import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function WalletTable({ data, page, limit }) {
  return (
    <>
    <div className="table-responsive">
    <Table style={{ minWidth: "900px" }}>
      <TableHead>
        <TableRow>
          <TableCell>Sr. No</TableCell>
          <TableCell>Company Name</TableCell>
          <TableCell>Company ID</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Contact Person</TableCell>
          <TableCell>Mobile</TableCell>
          <TableCell>Wallet Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((row, index) => (
          <TableRow key={row.id} sx={{ height: "40px" }}>
            <TableCell sx={{ paddingY: "4px " }}>
               {(page - 1) * limit + index + 1}
            </TableCell>
            <TableCell sx={{ paddingY: "4px " }}>{row?.company_name}</TableCell>
            <TableCell sx={{ paddingY: "4px " }}>{row?.id_prifix_company}</TableCell>
            <TableCell sx={{ paddingY: "4px " }}>{row?.city_name}</TableCell>
            <TableCell sx={{ paddingY: "4px " }}>{row?.name}</TableCell>
            <TableCell sx={{ paddingY: "4px " }}>
              {row?.mobile_number}
            </TableCell>
            <TableCell sx={{ paddingY: "4px " }}>
              {row?.wallet_amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    </>
  );
}
