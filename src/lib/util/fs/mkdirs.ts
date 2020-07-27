// Copyright (c) 2017-2020 BDISTIN. All rights reserved. MIT license.

import { promises as fsp } from 'fs';
import { dirname, normalize, resolve, sep } from 'path';
import { umask } from '../util';

const invalidWin32Path = (myPath: string): boolean => {
	const root = normalize(resolve(myPath)).split(sep);
	return /[<>:"|?*]/.test(myPath.replace(root[0], ''));
};

export interface MkdirsOptions {
	mode?: number;
}

export async function mkdirs(path: string, options?: MkdirsOptions | number): Promise<void> {
	const dirOptions = resolveOptions(options);

	if ((process.platform === 'win32') && invalidWin32Path(path)) {
		const errInval = new Error(`FS-NEXTRA: ${path} contains invalid WIN32 path characters.`);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		errInval.code = 'EINVAL';
		throw errInval;
	}

	path = resolve(path);

	try {
		await fsp.mkdir(path, dirOptions.mode);
	} catch (err) {
		if (err.code === 'ENOENT') {
			await mkdirs(dirname(path), dirOptions);
			await mkdirs(path, dirOptions);
			return;
		}
		const myStat = await fsp.stat(path);
		if (myStat.isDirectory()) return;
		throw err;
	}
}

function resolveOptions(options: MkdirsOptions | number = {}): MkdirsOptions {
	return {
		// eslint-disable-next-line no-bitwise
		mode: typeof options === 'number' ? options : options.mode || 0o0777 & ~umask
	};
}

export const mkdirp = mkdirs;
export const ensureDir = mkdirs;
