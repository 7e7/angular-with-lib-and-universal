import { mockConfig } from '../config-mock';
import { environment } from './environments/environment';

export function configFactory() {
  return environment.production ? window['__ENV_CONFIG'] : mockConfig;
}
