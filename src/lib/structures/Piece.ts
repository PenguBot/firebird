// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.

/* eslint-disable @typescript-eslint/naming-convention */
import { mergeDefault } from '@klasa/utils';
import { Firebird } from '@lib/Firebird';
import { basename, extname, join } from 'path';
import type { Store } from './Store';

export class Piece {

	public readonly firebird: Firebird;

	public readonly store: Store<Piece>;

	public readonly file: readonly string[];

	public readonly directory: string;

	public name: string;

	public enabled: boolean;

	public constructor(store: Store<Piece>, directory: string, file: readonly string[], options: PieceOptions = {}) {
		const defaults = Reflect.get(store.firebird.options.pieces.defaults, store.name) as Required<PieceOptions>;
		if (defaults) options = mergeDefault(defaults, options);
		this.firebird = store.firebird;
		this.store = store as Store<this>;
		this.directory = directory;
		this.file = file;
		this.name = options.name ?? basename(file[file.length - 1], extname(file[file.length - 1]));
		this.enabled = options.enabled ?? true;
	}

	public get type(): string {
		return this.store.name.slice(0, -1);
	}

	public get path(): string {
		return join(this.directory, ...this.file);
	}

	public async reload(): Promise<Piece | null> {
		const piece = await this.store.load(this.directory, this.file);
		if (piece) {
			await piece.init();
		}
		return piece;
	}

	public unload(): boolean {
		return this.store.remove(this);
	}

	public disable(): this {
		this.enabled = false;
		return this;
	}

	public enable(): this {
		this.enabled = true;
		return this;
	}

	public init(): unknown {
		return null;
	}

	public toString(): string {
		return this.name;
	}

	public toJSON(): Record<string, unknown> {
		return {
			directory: this.directory,
			file: this.file,
			path: this.path,
			name: this.name,
			type: this.type,
			enabled: this.enabled
		};
	}

}

export interface PieceOptions {
	name?: string;
	enabled?: boolean;
}
