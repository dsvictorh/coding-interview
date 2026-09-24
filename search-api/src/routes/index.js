import express from 'express';
const router = express.Router();

import candidateRoute from './candidate.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/candidates', candidateRoute);

  return router;
};

export default routes;
