/* eslint-disable @typescript-eslint/ban-ts-comment */

type TReolve<T> = (value: T | PromiseLike<T>) => void;
type TReject<T> = (value: T | PromiseLike<T>) => void;
export class Deferred<T> extends Promise<T> {
  public resolve: TReolve<T>;
  public reject: TReject<T>;
  constructor() {
    let resolveSelf: TReolve<T>;
    let rejectSelf: TReject<T>;
    super((resolve, reject) => {
      resolveSelf = resolve;
      rejectSelf = reject;
    });
    // @ts-ignore
    this.resolve = resolveSelf;
    // @ts-ignore
    this.reject = rejectSelf;
  }
}
