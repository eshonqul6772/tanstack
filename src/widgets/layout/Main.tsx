import {Suspense, useState} from 'react';
import {Outlet} from '@tanstack/react-router';
import {Box, Loader, Paper, Stack} from '@mantine/core';

import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const Main = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(true);

  return (
    <Box component="div" style={{display: 'flex', height: '100vh', backgroundColor: '#e5e5e5'}}>
      <Sidebar isOpenMenu={isOpenMenu}/>

      <Stack gap={0} style={{flex: 1}}>
        <Header isOpenMenu={isOpenMenu} onToggleMenu={setIsOpenMenu}/>

        <Box component="main" style={{flex: 1, overflowY: 'auto', padding: 16, backgroundColor: '#e5e5e5'}}>
          <Paper p="lg" radius="md" style={{backgroundColor: 'white', minHeight: '100%'}}>
            <Suspense
              fallback={
                <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 240}}>
                  <Loader/>
                </Box>
              }
            >
              <Outlet/>
            </Suspense>
          </Paper>
        </Box>

        <Footer/>
      </Stack>
    </Box>
  );
};

export default Main;
