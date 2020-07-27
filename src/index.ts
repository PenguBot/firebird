import 'module-alias/register';
import { Firebird } from '@lib/Firebird';
import { SENTRY_URL } from '@root/config';
import * as sentry from '@sentry/node';
import { noop } from '@utils/util';

const firebird = new Firebird();

async function main() {
	sentry.init({ dsn: SENTRY_URL });
	await firebird.start();
}

void main()
	.then(noop);

export const mainTest = () => 'this builds and pushes';
