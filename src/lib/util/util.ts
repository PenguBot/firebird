// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() { }

export const umask = process.umask(0o022);
process.umask(umask);
