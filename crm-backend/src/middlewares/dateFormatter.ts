import { Request, Response, NextFunction } from 'express';

/**
 * Middleware que convierte strings de fecha a objetos Date
 * Soporta formatos:
 * - ISO (YYYY-MM-DD)
 * - Locales (DD/MM/YYYY)
 * - Timestamps
 */
export const dateFormatter = (req: Request, res: Response, next: NextFunction) => {
  const formatDate = (dateString: string): Date | null => {
    try {
      // Intenta parsear como ISO (YYYY-MM-DD)
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return new Date(dateString);
      }

      // Intenta parsear formato local (DD/MM/YYYY)
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
      }

      // Intenta parsear como timestamp
      const timestamp = Date.parse(dateString);
      if (!isNaN(timestamp)) {
        return new Date(timestamp);
      }

      return null;
    } catch {
      return null;
    }
  };

  // Procesar campos de fecha en el body
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach(key => {
      if (key.toLowerCase().includes('date') && typeof req.body[key] === 'string') {
        const formattedDate = formatDate(req.body[key]);
        if (formattedDate) {
          req.body[key] = formattedDate;
        }
      }
    });
  }

  next();
};