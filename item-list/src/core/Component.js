export default class Component {
  $target;
  $props;
  $state;

  constructor($target, $props = {}) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  mounted() {}

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {}

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTargetExist = (target) => children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, event => {
      if (!isTargetExist(event.target)) return;
      callback(event);
    });
  }
}
