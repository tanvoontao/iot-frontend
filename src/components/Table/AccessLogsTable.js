/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';

import useAxios from '@/hooks/useAxios';
import axios from '@/config/apis';
import { setModal } from '@/redux/modal/action';

function AccessLogsTable() {
  const {
    response, error, loading, refetch,
  } = useAxios({
    axios,
    method: 'GET',
    url: '/api/data/table?page=1&limit=10',
    requestConfig: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  console.log(response);

  const columns = [
    {
      name: 'timestamp',
      label: '🕰️ Timestamp',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'temperature',
      label: '🌡️ Temperature',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'heart_rate',
      label: '💓 Heart Rate',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'fall_detect',
      label: '🚨 Fall detect',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value === 1 ? 'Yes' : 'No';
        },
      },
    },
    {
      name: 'motion_detect',
      label: '🚶‍♂️ Motion detect',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value === 1 ? 'Yes' : 'No';
        },
      },
    },
    {
      name: 'x',
      label: '🔴 - X-axis',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'y',
      label: '🟢 - Y-axis',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'z',
      label: '🔵 - Z-axis',
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    caseSensitive: false,
    search: true,
    selectableRowsHideCheckboxes: true,
    rowsPerPageOptions: [5, 10, 15, 20],
    // eslint-disable-next-line arrow-body-style
    customToolbar: () => {
      return (
        <Tooltip title="Refresh">
          <IconButton
            aria-label="refresh"
            onClick={() => {
              refetch();
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      );
    },
    serverSide: true,
    count: (!loading && !error && response.data) ? response.total : 0,
    onTableChange: (action, tableState) => {
      const { page, rowsPerPage } = tableState;
      if (action === 'changePage' || action === 'changeRowsPerPage') {
        refetch(`/api/data/table?page=${page + 1}&limit=${rowsPerPage}`);
      } else if (action === 'search') {
        const keyword = tableState.searchText;
        if (keyword) {
          refetch(`/api/data/table?page=${page + 1}&limit=${rowsPerPage}&search=${encodeURIComponent(keyword)}`);
        } else {
          refetch(`/api/data/table?page=${page + 1}&limit=${rowsPerPage}`);
        }
      }
    },
  };

  // eslint-disable-next-line arrow-body-style
  const dataRows = (!loading && !error && response.data) ? (response.data).map((d) => {
    return {
      timestamp: d.timestamp,
      temperature: d.temperature,
      heart_rate: d.heart_rate,
      fall_detect: d.fall_detect,
      motion_detect: d.motion_detect,
      x: d.x,
      y: d.y,
      z: d.z,
      actions: '',
    };
  }) : [];

  if (loading) { return <p>🌀 Loading</p>; }

  return (
    <MUIDataTable
      title="📊 Access Logs Table"
      data={dataRows}
      columns={columns}
      options={options}
    />
  );
}

export default AccessLogsTable;
