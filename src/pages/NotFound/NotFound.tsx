import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Box, Button, Center, Container, Group, Stack, Text, Title } from '@mantine/core';
import { ArrowLeft, FileQuestion } from 'lucide-react';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Center style={{ minHeight: '60vh' }}>
      <Container size="sm">
        <Stack gap="lg" align="center">
          <Box style={{ opacity: 0.7 }}>
            <FileQuestion size={100} color="var(--mantine-color-blue-6)" />
          </Box>

          <Title order={1} size="h1" ta="center">
            404
          </Title>

          <Text size="lg" c="dimmed" ta="center">
            {t('not_found') || 'Sahifa topilmadi'}
          </Text>

          <Group gap="md">
            <Button
              size="md"
              variant="light"
              color="blue"
              leftSection={<ArrowLeft size={18} />}
              onClick={() => navigate({ to: '/dashboard' })}
            >
              {t('back_to_dashboard') || 'Dashboard'}
            </Button>
          </Group>
        </Stack>
      </Container>
    </Center>
  );
};

export default NotFound;
