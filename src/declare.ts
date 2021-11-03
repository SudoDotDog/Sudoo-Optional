/**
 * @author WMXPY
 * @namespace Optional
 * @description Declare
 */

// eslint-disable-next-line @typescript-eslint/ban-types
export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ReturnTypes<F extends Function> = F extends (...args: any[]) => infer R ? R : never;
