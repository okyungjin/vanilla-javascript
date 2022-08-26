import Component from '../core/Component.js'

export default class ItemList extends Component {
  setup() {
    this.$state = {
      items: ['item 1', 'item 2']
    };
  }

  template() {
    const { items } = this.$state;
    return `
      <button class="add-btn">Add</button>
      <ul>
        ${ items.map((item, index) => `
          <li>
            ${ item }
            <button class="delete-btn" data-index="${index}">Delete</button>
          </li>
        `).join('') }
      </ul>
    `;
  }

  setEvent() {
    this.$target
      .querySelector('.add-btn')
      .addEventListener('click', () => {
        const { items } =  this.$state;
        this.setState({ items: [...items, `item ${items.length + 1}`] });
      });

    this.$target
      .querySelectorAll('.delete-btn')
      .forEach(deleteBtn => {
        deleteBtn.addEventListener('click', ({ target }) => {
          const items =  [...this.$state.items];
          const index = parseInt(target.dataset.index);
          items.splice(index, 1);
          this.setState({ items });
        });
      });
  }
}
