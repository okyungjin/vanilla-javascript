import Component from '../core/Component.js';
import { FILTER_TYPE } from '../constant';

export default class ItemFilter extends Component {
  template() {
    return `
      <button class="filter-btn" data-filter-type="${FILTER_TYPE.ALL}">전체 보기</button>
      <button class="filter-btn" data-filter-type="${FILTER_TYPE.ACTIVE_ONLY}">활성 보기</button>
      <button class="filter-btn" data-filter-type="${FILTER_TYPE.INACTIVE_ONLY}">비활성 보기</button>
    `
  }

  setEvent() {
    const { filterItems } = this.$props;
    this.addEvent('click', '.filter-btn', ({ target }) => {
      filterItems(target.dataset.filterType);
    });
  }
}