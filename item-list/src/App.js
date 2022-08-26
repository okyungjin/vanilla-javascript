import Component from './core/Component.js';
import ItemAppender from './components/ItemAppender.js';
import Items from './components/Items.js';
import ItemFilter from './components/ItemFilter.js';
import { FILTER_TYPE } from './constant'

export default class App extends Component {
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
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `
  }

  mounted() {
    const $itemAppender = this.$target.querySelector('[data-component="item-appender"]');
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector('[data-component="item-filter"]');
    const { addItem, deleteItem, toggleActive, filterItems } = this;

    new ItemAppender($itemAppender, {
      addItem: addItem.bind(this)
    });

    new Items($items, {
      filteredItems: this.filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleActive: toggleActive.bind(this),
    });

    new ItemFilter($itemFilter, {
      filterItems: filterItems.bind(this)
    });
  }

  get filteredItems() {
    const { filterType, items } = this.$state;
    return items.filter(({ active }) => {
      return (filterType === FILTER_TYPE.ACTIVE_ONLY && active)
        || (filterType === FILTER_TYPE.INACTIVE_ONLY && !active)
        || filterType === FILTER_TYPE.ALL
    });
  }

  addItem(contents) {
    const { items } = this.$state;
    const lastSeq = Math.max(0, ...items.map(item => item.seq));
    const seq = lastSeq + 1;
    const active = false;

    const newItem = { seq, contents, active };
    this.setState({
      items: [ ...items, newItem ]
    });
  }

  deleteItem(seq) {
    const items =  [...this.$state.items];
    const itemIndex = items.findIndex(item => item.seq === seq);
    items.splice(itemIndex, 1);
    this.setState({ items });
  }

  toggleActive(seq) {
    const items =  [...this.$state.items];
    const itemIndex = items.findIndex(item => item.seq === seq);
    items[itemIndex].active = !items[itemIndex].active;
    this.setState({ items });
  }

  filterItems(filterType) {
    this.setState({ filterType });
  }
}