import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface UseDeleteOptions<TArgs extends { id: number | null }> {
  entity: string;
  deleteFn: (args: TArgs) => Promise<unknown>;
}

export const createUseDelete = <TArgs extends { id: number | null }>({ entity, deleteFn }: UseDeleteOptions<TArgs>) => {
  return () => {
    const queryClient = useQueryClient();

    return useMutation<void, unknown, TArgs>({
      mutationFn: async args => {
        await deleteFn(args);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === entity && query.queryKey[1] === 'list'
        });
      }
    });
  };
};

interface UseSingleOptions<TData> {
  entity: string;
  fetcher: (id: number) => Promise<TData>;
}

export const createUseSingle = <TData>({ entity, fetcher }: UseSingleOptions<TData>) => {
  return ({ id }: { id?: number }) => {
    const { data, ...args } = useQuery<TData>({
      queryKey: [entity, 'single', id],
      queryFn: async () => {
        if (id == null) {
          throw new Error('Missing id');
        }
        return fetcher(id);
      },
      enabled: !!id,
      retry: false
    });

    return { item: data, ...args };
  };
};

interface EntityCrudHookOptions<TData, TDeleteArgs extends { id: number | null }> {
  entity: string;
  deleteFn: (args: TDeleteArgs) => Promise<unknown>;
  fetcher: (id: number) => Promise<TData>;
}

export const createEntityCrudHooks = <TData, TDeleteArgs extends { id: number | null }>({
  entity,
  deleteFn,
  fetcher
}: EntityCrudHookOptions<TData, TDeleteArgs>) => {
  return {
    useDelete: createUseDelete<TDeleteArgs>({ entity, deleteFn }),
    useSingle: createUseSingle<TData>({ entity, fetcher })
  };
};

interface CrudFromEntityOptions<TData, TDeleteArgs extends { id: number | null }, TApiData> {
  entity: string;
  deleteFn: (args: TDeleteArgs) => Promise<unknown>;
  singleFn: (args: { id: number }) => Promise<{ data: { data: TApiData } }>;
  mapSingle: (apiData: TApiData) => TData;
}

export const createCrudFromEntity = <TData, TDeleteArgs extends { id: number | null }, TApiData>({
  entity,
  deleteFn,
  singleFn,
  mapSingle
}: CrudFromEntityOptions<TData, TDeleteArgs, TApiData>) => {
  return createEntityCrudHooks<TData, TDeleteArgs>({
    entity,
    deleteFn,
    fetcher: async id => {
      const { data } = await singleFn({ id });
      return mapSingle(data.data);
    }
  });
};
