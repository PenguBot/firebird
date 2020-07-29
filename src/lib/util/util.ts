// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() { }

/**
 * @since 0.0.1
 * @copyright 2017-2020 BDISTIN
 * @license MIT
 */
export const umask = process.umask(0o022);
process.umask(umask);
