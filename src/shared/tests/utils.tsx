import { waitFor } from '@testing-library/dom'
import { expect } from 'vitest'
import { act, render } from '@testing-library/react'
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRouteWithContext,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import type { RenderOptions } from '@testing-library/react'
import type { RegisteredRouter } from '@tanstack/react-router'
import type { FC, ReactElement, ReactNode } from 'react'
import type { RouterQueryProvider } from '@/shared/integrations/tanstack-query/root-provider.tsx'
import * as TanStackQueryProvider from '@/shared/integrations/tanstack-query/root-provider.tsx'

type Routes = RegisteredRouter['routesByPath']
const TanStackQueryProviderContext = TanStackQueryProvider.getContext()

interface MockedRouterProps<T extends keyof Routes = keyof Routes> {
  initialLocation?: string
  mockRoute?: MockRoute<T>
  children: ReactNode
}

type MockRoute<T extends keyof Routes> = {
  path: T
  loaderData?: Routes[T] extends { types: { loaderData: infer LoaderData } }
    ? LoaderData
    : never
  context?: Routes[T] extends { types: { routeContext: infer Context } }
    ? Context
    : never
}

/**
 * Router wrapper component for use with renderHook and testing
 */
export const MockedRouter: FC<MockedRouterProps> = ({
  initialLocation = '/',
  mockRoute,
  children,
}) => {
  const memoryHistory = createMemoryHistory({
    initialEntries: [initialLocation],
  })

  const testRouteTree = createRootRouteWithContext<RouterQueryProvider>()({
    component: () => (mockRoute ? <Outlet /> : children),
  })

  if (mockRoute) {
    testRouteTree.addChildren([
      createRoute({
        getParentRoute: () => testRouteTree,
        path: mockRoute.path,
        component: () => children,
        beforeLoad: () => mockRoute.context,
        loader: () => mockRoute.loaderData,
      }),
    ])
  }

  const router = createRouter({
    routeTree: testRouteTree,
    defaultPendingMs: 0,
    history: memoryHistory,
    context: { ...TanStackQueryProviderContext },
  })

  return (
    <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
      <RouterProvider router={router} />
    </TanStackQueryProvider.Provider>
  )
}

export const renderWithRouter = async <TRoute extends keyof Routes>(
  component: ReactElement,
  {
    initialLocation = '/',
    mockRoute,
    ...options
  }: {
    initialLocation?: string
    mockRoute?: MockRoute<TRoute>
  } & RenderOptions = {},
): Promise<void> => {
  render(
    <MockedRouter initialLocation={initialLocation} mockRoute={mockRoute}>
      {component}
    </MockedRouter>,
    options,
  )

  await waitFor(() => {
    // TSR renders async, so we wait for it here
    expect(document.body).toBeInTheDocument()
  })
}

export const resizeWindow = async (width: number) => {
  await act(async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    })
    window.dispatchEvent(new Event('resize'))
  })
}
