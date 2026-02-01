import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Box, Button, Center, Container, Group, Stack, Text, Title } from '@mantine/core';
import { ArrowLeft, ShieldX } from 'lucide-react';

const NoAccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Center style={{ minHeight: '60vh' }}>
      <Container size="sm">
        <Stack gap="lg" align="center">
          <Box style={{ opacity: 0.7 }}>
            <ShieldX size={100} color="var(--mantine-color-red-6)" />
          </Box>

          <Title order={1} size="h1" ta="center">
            403
          </Title>

          <Text size="lg" c="dimmed" ta="center">
            {t('no_access_desc') || 'Bu sahifaga kirishga ruxsatingiz yo\'q'}
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

export default NoAccess;
