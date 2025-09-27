import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'

import type { QueryClient } from '@tanstack/react-query'
import TanStackQueryDevtools from '@/shared/integrations/tanstack-query/devtools'


interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      {/*<TanstackDevtools*/}
      {/*  config={{*/}
      {/*    position: 'bottom-left',*/}
      {/*  }}*/}
      {/*  plugins={[*/}
      {/*    {*/}
      {/*      name: 'Tanstack Router',*/}
      {/*      render: <TanStackRouterDevtoolsPanel />,*/}
      {/*    },*/}
      {/*    TanStackQueryDevtools,*/}
      {/*  ]}*/}
      {/*/>*/}
    </>
  ),
})
