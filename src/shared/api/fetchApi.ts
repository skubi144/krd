interface FetchApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  body?: unknown
}
export interface ApiError<T = unknown> extends Error {
  status: number
  payload?: T
}

export async function fetchApi<TData = unknown, TError = ApiError<undefined>>(
  options: FetchApiOptions,
): Promise<TData> {
  const { url, method = 'GET', body } = options
  const response = await fetch(
    `https://rekrutacja-webhosting-it.krd.pl${url}`,
    {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    },
  )
  let data: unknown

  try {
    data = await response.json()
  } catch {
    data = undefined
  }

  if (!response.ok) {
    throw Object.assign(
      new Error(`Request failed ${response.status} ${response.statusText}`),
      {
        status: response.status,
        statusText: response.statusText,
        data: data as TError,
      },
    )
  }

  return data as TData
}
