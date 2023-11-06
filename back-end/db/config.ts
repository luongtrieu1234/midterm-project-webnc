import dotenv from 'dotenv';

import config from '../config';

dotenv.config();

module.exports = config.database();
