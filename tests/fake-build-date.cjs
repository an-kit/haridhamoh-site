const RealDate = Date;
const fixed = process.env.EVENT_LIFECYCLE_BUILD_NOW;

if (!fixed) {
  throw new Error("EVENT_LIFECYCLE_BUILD_NOW is required for lifecycle browser builds.");
}

const fixedTime = new RealDate(fixed).getTime();
if (Number.isNaN(fixedTime)) {
  throw new Error(`Invalid EVENT_LIFECYCLE_BUILD_NOW: ${fixed}`);
}

class FixedDate extends RealDate {
  constructor(...args) {
    super(...(args.length === 0 ? [fixedTime] : args));
  }

  static now() {
    return fixedTime;
  }

  static parse(value) {
    return RealDate.parse(value);
  }

  static UTC(...args) {
    return RealDate.UTC(...args);
  }
}

global.Date = FixedDate;
