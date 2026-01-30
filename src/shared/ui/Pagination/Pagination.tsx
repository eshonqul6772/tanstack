import { useNavigate } from '@tanstack/react-router';
import { Group, Pagination as MantinePagination, Select } from '@mantine/core';

import config from '@/shared/config';

interface Props {
  total: number;
  current: number;
  pageSize?: number;
}

const Pagination = ({ total, current, pageSize }: Props) => {
  const navigate = useNavigate();

  const resolvedPageSize = Number(pageSize ?? config.list.perPage);
  const safePageSize = Number.isFinite(resolvedPageSize) ? resolvedPageSize : config.list.perPage;
  const pageSizeOptions = config.list.pageSize.includes(safePageSize)
    ? config.list.pageSize
    : [...config.list.pageSize, safePageSize].sort((a, b) => a - b);
  const selectedPageSize = pageSizeOptions.includes(safePageSize) ? safePageSize : config.list.perPage;
  const pages = Math.ceil(total / safePageSize);

  const updateSearch = (next: Record<string, unknown>) => {
    navigate({
      search: ((prev: Record<string, unknown>) => ({
        ...(prev as Record<string, unknown>),
        ...next
      })) as any
    }).then(r => r);
  };

  const handleChange = (value: number) => {
    updateSearch({ page: value });
  };

  const handlePageSizeChange = (value: string | null) => {
    if (!value) {
      return;
    }

    updateSearch({ page: 1, perPage: Number(value) });
  };

  return (
    <Group justify="space-between">
      <MantinePagination total={pages} value={current} onChange={handleChange} />

      <Select
        value={String(selectedPageSize)}
        onChange={handlePageSizeChange}
        data={pageSizeOptions.map(size => ({ value: String(size), label: String(size) }))}
        size="xs"
        allowDeselect={false}
        w={100}
      />
    </Group>
  );
};

export default Pagination;
