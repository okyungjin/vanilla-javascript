import Component from '../core/Component.js'

export default class Items extends Component {
  template() {
    const { filteredItems } = this.$props;
    return `
      <ul>
        ${ filteredItems.map(({ seq, contents, active }) => `
          <li data-seq="${seq}">
            ${ contents }
            <button class="toggle-active-btn" style="color: ${ active ? '#09F' : '#F09'}">
              ${ active ? '활성' : '비활성' }
            </button>
            <button class="delete-btn">Delete</button>
          </li> 
        `).join('') }
      </ul>
    `;
  }

  setEvent() {
    const { toggleActive, deleteItem } = this.$props;

    this.addEvent('click', '.toggle-active-btn', ({ target }) => {
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      toggleActive(seq);
    });

    this.addEvent('click', '.delete-btn', ({ target }) => {
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      deleteItem(seq);
    });
  }
}
