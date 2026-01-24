import { Link, useLocation } from '@tanstack/react-router';
import {
  ActionIcon,
  Box,
  Collapse,
  Group,
  NavLink,
  Stack,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import type React from 'react';
import { useState } from 'react';
import { DEFAULT_EXPANDED_SECTIONS, MENU_SECTIONS, type MenuItem } from './menu';

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(DEFAULT_EXPANDED_SECTIONS);
  const location = useLocation();

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  const renderMenuItems = (items: MenuItem[]) => (
    <Stack gap="xs" pl={sidebarOpen ? 'md' : 0}>
      {items.map((item) => (
        <NavLink
          key={item.path}
          component={Link}
          to={item.path}
          label={sidebarOpen ? item.label : undefined}
          leftSection={<span style={{ fontSize: rem(18) }}>{item.icon}</span>}
          active={isActive(item.path)}
          title={!sidebarOpen ? item.label : ''}
          styles={{
            root: {
              borderRadius: 'var(--mantine-radius-md)',
              '&[data-active]': {
                backgroundColor: 'var(--mantine-colors-blue-0)',
                color: 'var(--mantine-colors-blue-6)',
                fontWeight: 500,
              },
            },
          }}
        />
      ))}
    </Stack>
  );

  return (
    <Box component="aside" h="100%" display="flex" style={{ flexDirection: 'column' }}>
      {sidebarOpen && (
        <Box
          p="lg"
          style={{
            borderBottom: '1px solid #e5e5e5',
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 10,
            height: 87,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Title order={2} size="h3">
            Ecme
          </Title>
        </Box>
      )}

      <Stack
        component="nav"
        gap="lg"
        p="md"
        style={{
          flex: 1,
          overflowY: 'auto',
        }}
      >
        {MENU_SECTIONS.map((section) => (
          <Box key={section.id}>
            <Group
              justify={sidebarOpen ? 'space-between' : 'center'}
              onClick={() => toggleSection(section.id)}
              style={{
                cursor: 'pointer',
                padding: 'var(--mantine-spacing-xs) var(--mantine-spacing-sm)',
                borderRadius: 'var(--mantine-radius-md)',
                userSelect: 'none',
              }}
              className="hover-bg"
            >
              {!sidebarOpen && (
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  radius="md"
                  title={section.label}
                >
                  <span style={{ fontSize: rem(18) }}>{section.icon}</span>
                </ActionIcon>
              )}
              {sidebarOpen && (
                <>
                  <Group gap="xs">
                    <span style={{ fontSize: rem(16) }}>{section.icon}</span>
                    <Text size="xs" fw={600} tt="uppercase" c="dimmed">
                      {section.label}
                    </Text>
                  </Group>
                  <IconChevronDown
                    size={18}
                    style={{
                      transition: 'transform 300ms ease-in-out',
                      transform: expandedSections.includes(section.id)
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                    }}
                  />
                </>
              )}
            </Group>
            <Collapse
              in={expandedSections.includes(section.id)}
              transitionDuration={300}
              transitionTimingFunction="ease-in-out"
            >
              {renderMenuItems(section.items)}
            </Collapse>
          </Box>
        ))}
      </Stack>

      {/* Footer Text */}
      {sidebarOpen && (
        <Box
          p="md"
          style={{
            borderTop: '1px solid var(--mantine-colors-gray-2)',
            flexShrink: 0,
          }}
        >
          <Text size="xs" c="dimmed" ta="center">
            Copyright © 2026 <Text span fw={600}>
              Ecme
            </Text>{' '}
            All rights reserved.
          </Text>
        </Box>
      )}

      <style>{`
        .hover-bg:hover {
          background-color: var(--mantine-colors-gray-0);
        }
      `}</style>
    </Box>
  );
};

export default Sidebar;
