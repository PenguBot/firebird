/* eslint-disable @typescript-eslint/naming-convention */
import { ClientOptions as InfluxDBClientOptions } from '@influxdata/influxdb-client';

export const INFLUX_URL = 'http://localhost:8285';
export const INFLUX_TOKEN = '';
export const INFLUX_ORG = 'PenguBot';
export const INFLUX_ORG_ANALYTICS_BUCKET = 'analytics';
export const INFLUX_OPTIONS: InfluxDBClientOptions = {
	url: INFLUX_URL,
	token: INFLUX_TOKEN
};

export const SENTRY_URL = '';
