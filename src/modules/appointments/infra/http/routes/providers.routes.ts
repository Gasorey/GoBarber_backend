import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providersDayAvailability = new ProviderDayAvailabilityController();
const providersMonthAvailability = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required().uuid(),
    },
  }),
  providersDayAvailability.index,
);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providersMonthAvailability.index,
);

export default providersRouter;
