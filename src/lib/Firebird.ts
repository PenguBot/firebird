import { InfluxDB, WriteApi } from '@influxdata/influxdb-client';
import { INFLUX_OPTIONS, INFLUX_ORG, INFLUX_ORG_ANALYTICS_BUCKET } from '@root/config';
import { EventEmitter } from 'events';

export class Firebird extends EventEmitter {

	public readonly kInflux: InfluxDB = new InfluxDB(INFLUX_OPTIONS);

	public readonly kAnalyticsWrite!: WriteApi;

	public constructor() {
		super();

		this.kAnalyticsWrite = this.kInflux.getWriteApi(INFLUX_ORG, INFLUX_ORG_ANALYTICS_BUCKET);
	}

	public async start() {
		await this.kAnalyticsWrite.flush();
	}

}
