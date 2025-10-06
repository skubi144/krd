import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'

import type { RouterQueryProvider } from '@/shared/integrations/tanstack-query/root-provider.tsx'
import TanStackQueryDevtools from '@/shared/integrations/tanstack-query/devtools'
import { ErrorPage } from '@/shared/pages/error-page/error-page.tsx'


export const Route = createRootRouteWithContext<RouterQueryProvider>()({
  component: () => (
    <>
      <Outlet />
      <TanstackDevtools
        config={{
          position: 'top-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  ),
  errorComponent: () => <ErrorPage />,
})
