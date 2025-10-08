import { Box, TableCell, TableRow } from "@mui/material";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SocietyTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <SkeletonTheme width={30} />
          </TableCell>
          <TableCell>
            <Skeleton width={100} />
          </TableCell>
          <TableCell>
            <Skeleton width={80} />
          </TableCell>
          <TableCell>
            <Skeleton width={120} />
          </TableCell>
          <TableCell>
            <Skeleton width={70} />
          </TableCell>
          <TableCell>
            <Skeleton width={70} />
          </TableCell>
          <TableCell>
            <Skeleton width={80} />
          </TableCell>
          <TableCell>
            <Skeleton width={40} height={30} />
          </TableCell>
          <TableCell>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Skeleton width={30} height={30} />
              <Skeleton width={30} height={30} />
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default SocietyTableSkeleton;
