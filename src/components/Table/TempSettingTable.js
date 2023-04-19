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

function TempSettingTable() {
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

  const response2 = [{
    hypothermia: 35,
    mild_hypothermia: 36.5,
    normal: 37.5,
    mild_fever: 38,
    fever: 40,
    hyperpyrexia: 40,
  }];

  const handleEdit = (rowId) => {
    // const selectedService = response2.data[rowId];
    const tempSettings = response2[rowId];
    setModal({ type: 'TempSettingForm', data: tempSettings });
  };

  const columns = [
    {
      name: 'hypothermia',
      label: '❄️ Hypothermia',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'mild_hypothermia',
      label: '🥶 Mild Hypothermia',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'normal',
      label: '😊 Normal',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'mild_fever',
      label: '😓 Mild_fever',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'fever',
      label: '🤒 Fever',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'hyperpyrexia',
      label: '🔥 Hyperpyrexia',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        customBodyRender: (value, tableMeta) => {
          const rowId = tableMeta.rowIndex;
          return (
            <div>
              <IconButton aria-label="edit" onClick={() => handleEdit(rowId)}>
                <EditIcon />
              </IconButton>
            </div>
          );
        },
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
  const dataRows = response2;
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
      title="🌡️ Temperature Settings Table"
      data={dataRows}
      columns={columns}
      options={options}
    />
  );
}

export default TempSettingTable;
