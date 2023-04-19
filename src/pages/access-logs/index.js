/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
// https://github.com/michalsnik/aos/issues/574
// https://micku7zu.github.io/vanilla-tilt.js/
// https://codesandbox.io/s/n5ptm?file=/src/index.js

import { Inter } from '@next/font/google';
import {
  Container, IconButton, Grid, Box,
} from '@mui/material';

import { useEffect, useState, useRef } from 'react';

import LightbulbIcon from '@mui/icons-material/Lightbulb';

import Metatags from '@/components/Metatags/Metatags';
import axios from '@/config/apis';
import useAxios from '@/hooks/useAxios';
import UserLayout from '@/components/Layout/UserLayout';
import AccessLogsTable from '@/components/Table/AccessLogsTable';

export default function Settings() {
  return (
    <>
      <Metatags />

      <UserLayout>
        <AccessLogsTable />
      </UserLayout>
    </>
  );
}
