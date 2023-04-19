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
    url: '/services/table?page=1&limit=10',
    requestConfig: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  const response2 = {
    total: 1,
    data: [
      {
        timestamp: '2023-04-19T10:30:00Z',
        temperature: 36.7,
        heart_rate: 75,
        fall_detect: 1,
        motion_detect: 0,
        x: 120,
        y: 120,
        z: 120,
      },
    ],
  };

  const handleEdit = (rowId) => {
    // const selectedService = response2.data[rowId];
    const tempSettings = response2.data[rowId];
    setModal({ type: 'SystemSettingForm', data: tempSettings });
  };

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
        refetch(`/services/table?page=${page + 1}&limit=${rowsPerPage}`);
      } else if (action === 'search') {
        const keyword = tableState.searchText;
        if (keyword) {
          refetch(`/services/table?page=${page + 1}&limit=${rowsPerPage}&search=${encodeURIComponent(keyword)}`);
        } else {
          refetch(`/services/table?page=${page + 1}&limit=${rowsPerPage}`);
        }
      }
    },
  };

  // eslint-disable-next-line arrow-body-style
  const dataRows = response2.data;
  //   (!loading && !error && response.data) ? (response.data).map((service) => {
  //   return {
  //     name: service.name,
  //     image: service.image,
  //     actions: '',
  //   };
  // }) : [];

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
