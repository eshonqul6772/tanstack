import { MantineProvider as MantineCoreProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import type React from 'react';
import 'dayjs/locale/ru';

const MantineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MantineCoreProvider
      defaultColorScheme="light"
      theme={{
        primaryColor: 'blue',
        fontFamily: 'Inter, sans-serif',
        components: {
          Button: {
            defaultProps: {
              radius: 'md',
              size: 'md'
            }
          },
          TextInput: {
            defaultProps: {
              size: 'md'
            }
          },
          Select: {
            defaultProps: {
              size: 'md'
            }
          }
        }
      }}
    >
      <DatesProvider settings={{ locale: 'ru' }}>
        <ModalsProvider>
          <Notifications position="top-right" zIndex={1000} />
          {children}
        </ModalsProvider>
      </DatesProvider>
    </MantineCoreProvider>
  );
};

export default MantineProvider;
