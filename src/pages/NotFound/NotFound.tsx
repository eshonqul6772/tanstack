import type React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Container, Group, Stack, Text, Title, Center } from '@mantine/core';
import { IconArrowLeft, IconError404 } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Center style={{ minHeight: '60vh' }}>
      <Container size="sm">
        <Stack gap="lg" align="center">
          {/* Icon */}
          <Box style={{ fontSize: 120, opacity: 0.7 }}>
            <IconError404 size={120} color="var(--mantine-colors-blue-6)" />
          </Box>

          {/* Title */}
          <Title order={1} size="h1" ta="center">
            404
          </Title>

          {/* Description */}
          <Text size="lg" c="dimmed" ta="center">
            {t('not_found')}
          </Text>

          {/* Buttons */}
          <Group gap="md">
            <Button
              size="md"
              variant="light"
              color="blue"
              leftSection={<IconArrowLeft size={18} />}
              onClick={() => navigate({ to: '/dashboard' })}
            >
              {t('back_to_dashboard') || 'Dashboard'}
            </Button>
            <Button
              size="md"
              variant="outline"
              color="blue"
              onClick={() => navigate({ to: '/' })}
            >
              {t('home') || 'Home'}
            </Button>
          </Group>
        </Stack>
      </Container>
    </Center>
  );
};

export default NotFound;
