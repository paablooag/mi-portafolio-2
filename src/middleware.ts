import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  try {
    return await next();
  } catch (error: any) {
    console.error('Error en middleware:', error);
    
    // Log del error para debugging
    console.error('URL solicitada:', context.url.pathname);
    console.error('Error details:', {
      status: error.status,
      message: error.message,
      stack: error.stack
    });
    
    // Si es un error 404, redirigir a la página 404
    if (error.status === 404 || error.message?.includes('404') || error.message?.includes('not found')) {
      return context.redirect('/404');
    }
    
    // Para otros errores (500, etc.), también redirigir a 404 para mantener consistencia
    // Esto evita mostrar errores técnicos al usuario
    return context.redirect('/404');
  }
};
