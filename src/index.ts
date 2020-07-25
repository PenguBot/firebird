import 'module-alias/register';
import { Firebird } from '@lib/Firebird';
import * as sentry from '@sentry/node';
import { noop } from '@utils/util';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebird = new Firebird();

// eslint-disable-next-line @typescript-eslint/require-await
async function main() {
	sentry.init({ dsn: '' });
}

void main()
	.then(noop);

export const mainTest = () => 'this builds and pushes';
