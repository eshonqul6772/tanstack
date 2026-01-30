import { Suspense, useState } from 'react';
import { Outlet } from '@tanstack/react-router';
import { Box, Paper, Stack } from '@mantine/core';

import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const Main = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(true);

  return (
    <Suspense fallback={'loading'}>
      <Box component="div" style={{ display: 'flex', height: '100vh', backgroundColor: '#e5e5e5' }}>
        <Box
          style={{
            transition: 'width 300ms ease-in-out',
            width: isOpenMenu ? '256px' : '80px',
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: 'white',
            borderRight: '1px solid #e5e5e5'
          }}
        >
          <Sidebar isOpenMenu={isOpenMenu} />
        </Box>

        <Stack gap={0} style={{ flex: 1 }}>
          <Header isOpenMenu={isOpenMenu} onToggleMenu={setIsOpenMenu} />

          <Box component="main" style={{ flex: 1, overflowY: 'auto', padding: 16, backgroundColor: '#e5e5e5' }}>
            <Paper p="lg" radius="md" style={{ backgroundColor: 'white' }}>
              <Outlet />
            </Paper>
          </Box>

          <Footer />
        </Stack>
      </Box>
    </Suspense>
  );
};

export default Main;
