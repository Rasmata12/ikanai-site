import type { NextFunction, Request, Response } from 'express';
import { adminIsConfigured, env } from '../env.js';

/**
 * Protège les routes /api/admin/*. Le jeton doit être envoyé dans l'en-tête
 * `x-admin-token` et correspondre exactement à ADMIN_TOKEN (voir .env).
 * Sans ADMIN_TOKEN configuré côté serveur, ces routes sont désactivées :
 * mieux vaut un outil indisponible qu'un outil ouvert à tout le monde.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!adminIsConfigured) {
    return res.status(503).json({
      ok: false,
      error: "L'administration de la newsletter n'est pas configurée (ADMIN_TOKEN manquant).",
    });
  }
  const provided = req.header('x-admin-token');
  if (!provided || provided !== env.adminToken) {
    return res.status(401).json({ ok: false, error: 'Jeton administrateur invalide.' });
  }
  next();
}
