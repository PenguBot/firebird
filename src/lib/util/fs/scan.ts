import { Cache } from '@klasa/cache';
import { Dirent, promises as fsp } from 'fs';
import { join, resolve } from 'path';

export type Filter = (dirent: Dirent, path: string) => boolean;

export function scan(root: string, filter?: Filter): Promise<Cache<string, Dirent>> {
	return deepScan(resolve(root), 0, new Cache(), filter);
}

export async function deepScan(path: string, level: number, results: Cache<string, Dirent>, filter?: Filter): Promise<Cache<string, Dirent>> {
	for await (const dirent of await fsp.opendir(path)) {
		const fullPath = join(path, dirent.name);

		if (!filter || filter(dirent, fullPath)) results.set(fullPath, dirent);
		if (dirent.isDirectory()) await deepScan(join(path, dirent.name), level + 1, results, filter);
	}

	return results;

}
