class OperationRecord {
  defaultConfig = {};
  constructor(props) {
    this.config = {
      ...this.defaultConfig,
      ...(props.config === undefined ? {} : props.config)
    };
  }
  init() {}
}
const OR = OperationRecord;
