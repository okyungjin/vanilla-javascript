import Component from '../core/Component.js';
import { KEY_TYPE } from '../constant'

const INITIAL_TIMER_ID = undefined;

export default class SearchInput extends Component {
  timerId = INITIAL_TIMER_ID;

  template() {
    const { inputValue } = this.$props;
    return `
      <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="${inputValue}">
    `
  }

  setEvent() {
    const { onSearchInputChanged, onArrowKeyup, onItemSelected } = this.$props;
    this.addEvent('keyup', '.SearchInput__input', ({ key, target }) => {
      if (key === KEY_TYPE.ENTER) {
        onItemSelected(target.value);
        if (this.timerId) clearTimeout(this.timerId);
      }

      else if (key === KEY_TYPE.ARROW_UP || key === KEY_TYPE.ARROW_DOWN) {
        onArrowKeyup(key);
      }

      else {
        if (this.timerId) clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
          onSearchInputChanged(target.value);
        }, 1000);
      }
    });

  }
}