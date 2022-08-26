import Component from '../core/Component.js';

export default class Suggestion extends Component {
  template() {
    const { items, selectedIndex } = this.$props;
    return `
      <ul>
        ${ items
            .map((item, idx) => `
              <li data-item="${item}" class="${selectedIndex === idx ? 'Suggestion__item--selected' : null}">
                ${ this.highlightItemIfMatchedText(item) }
              </li>`)
            .join('') }
      </ul>
    `
  }

  setEvent() {
    const { items, onItemSelected } = this.$props;
    if (!items.length) this.$target.classList = [];

    this.addEvent('click', 'li', ({ target }) => {
      onItemSelected(target.dataset.item);
    })
  }

  highlightItemIfMatchedText(item) {
    const { matchedText } = this.$props;
    const caseInsensitiveRegExp = new RegExp(matchedText, 'i')
    return item.replace(caseInsensitiveRegExp, `<span class="Suggestion__item--matched">${ matchedText }</span>`);
  }
}