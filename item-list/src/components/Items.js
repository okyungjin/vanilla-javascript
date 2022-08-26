import Component from '../core/Component.js'

const FILTER_TYPE = Object.freeze({
  ALL: 'ALL',
  ACTIVE_ONLY: 'ACTIVE_ONLY',
  INACTIVE_ONLY: 'INACTIVE_ONLY'
});

export default class ItemList extends Component {
  get filteredItems() {
    const { filterType, items } = this.$state;
    return items.filter(({ active }) => {
      return (filterType === FILTER_TYPE.ACTIVE_ONLY && active)
        || (filterType === FILTER_TYPE.INACTIVE_ONLY && !active)
        || filterType === FILTER_TYPE.ALL
    });
  }

  setup() {
    this.$state = {
      filterType: FILTER_TYPE.ALL,
      items: [
        { seq: 1, contents: 'item 1', active: false },
        { seq: 2, contents: 'item 2', active: true },
      ]
    };
  }

  template() {
    return `
      <header>
        <input type="text" class="appender" placeholder="아이템 내용 입력" />
      </header>
      <main>
        <ul>
          ${ this.filteredItems.map(({ seq, contents, active }) => `
            <li data-seq="${seq}">
              ${ contents }
              <button class="toggle-active-btn" style="color: ${ active ? '#09F' : '#F09'}">
                ${ active ? '활성' : '비활성' }
              </button>
              <button class="delete-btn">Delete</button>
            </li> 
          `).join('') }
        </ul>
      </main>
      <footer>
        <button class="filter-btn" data-filter-type="${FILTER_TYPE.ALL}">전체 보기</button>
        <button class="filter-btn" data-filter-type="${FILTER_TYPE.ACTIVE_ONLY}">활성 보기</button>
        <button class="filter-btn" data-filter-type="${FILTER_TYPE.INACTIVE_ONLY}">비활성 보기</button>
      </footer>
    `;
  }

  setEvent() {
    this.addEvent('keyup', '.appender', ({ key, target }) => {
      if (key !== 'Enter') return;
      const { items } = this.$state;

      const lastSeq = Math.max(0, ...items.map(item => item.seq));
      const seq = lastSeq + 1;
      const contents = target.value;
      const active = false;

      const newItem = { seq, contents, active };
      this.setState({
        items: [ ...items, newItem ]
      });
    });

    this.addEvent('click', '.delete-btn', ({ target }) => {
      const items =  [...this.$state.items];
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      const itemIndex = items.findIndex(item => item.seq === seq);
      items.splice(itemIndex, 1);
      this.setState({ items });
    });

    this.addEvent('click', '.toggle-active-btn', ({ target }) => {
      const items =  [...this.$state.items];
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      const itemIndex = items.findIndex(item => item.seq === seq);
      items[itemIndex].active = !items[itemIndex].active;
      this.setState({ items });
    });



    this.addEvent('click', '.filter-btn', ({ target }) => {
      this.setState({ filterType: target.dataset.filterType })
    });
  }
}
