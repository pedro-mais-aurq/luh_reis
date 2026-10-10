export const routes = { home: '/', method: '/metodo', access: '/acesso', training: '/treinos' } as const;
export const reservedRoutes = [routes.method, routes.access, routes.training] as const;
