import React from 'react';
import { CardContent, Grid, Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SystemUserSkeleton = () => {
  const skeletonInput = <Skeleton height={40} />;
  const skeletonMultiLine = <Skeleton count={2} height={30} style={{ marginBottom: 6 }} />;
  const skeletonCheckbox = <Skeleton circle width={20} height={20} />;
  const skeletonAvatar = <Skeleton circle width={120} height={120} />;
  
  return (
    <CardContent sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* First Row */}
        {[...Array(3)].map((_, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            {skeletonInput}
          </Grid>
        ))}

        {/* Address and Role/Password */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>{skeletonMultiLine}</Grid>
            {[...Array(2)].map((_, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                {skeletonInput}
                <Typography variant="body2" color="textSecondary">
                  <Skeleton width={180} />
                </Typography>
              </Grid>
            ))}

            {/* Privileges Table */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <Skeleton width={100} />
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {['Page Name', 'View', 'Add', 'Edit', 'Delete', 'Active / Inactive'].map((header, idx) => (
                        <TableCell key={idx}><Skeleton width={80} /></TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...Array(3)].map((_, rowIdx) => (
                      <TableRow key={rowIdx}>
                        <TableCell><Skeleton width={120} /></TableCell>
                        {[...Array(5)].map((_, colIdx) => (
                          <TableCell key={colIdx}>{skeletonCheckbox}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>

        {/* Profile Upload */}
        <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
          <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                position: 'relative',
                width: 120,
                height: 120,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f4f4f4',
              }}
            >
              {skeletonAvatar}
              <IconButton
                disabled
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                }}
              >
                <Skeleton circle width={30} height={30} />
              </IconButton>
            </Box>
            <Skeleton width={100} height={20} />
          </Paper>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default SystemUserSkeleton;
