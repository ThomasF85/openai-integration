export class ModerationError extends Error {
  flags: string[];

  constructor(flags: string[]) {
    super();

    // assign the error class name in your custom error (as a shortcut)
    this.name = ModerationError.NAME;

    // capturing the stack trace keeps the reference to your error class
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.flags = flags;
  }

  static NAME = "ModerationError";
}
