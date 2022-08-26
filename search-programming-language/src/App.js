import Component from './core/Component.js';
import SelectedLanguage from './components/SelectedLanguage.js';
import SearchInput from './components/SearchInput.js';
import Suggestion from './components/Suggestion.js';
import { fetchLanguages } from './api'
import { KEY_TYPE } from './constant'


export default class App extends Component {
  setup() {
    this.$state = {
      selectedIndex: 0,
      searchInputValue: '',
      languages: [],
    };
  }

  template() {
    return `
      <div class="SelectedLanguage"></div>
      <form class="SearchInput"></form>
      <div class="Suggestion"></div>
    `
  }

  setEvent() {
    this.addEvent('submit', '.SearchInput', (event) => {
      event.preventDefault();
    });
  }

  mounted() {
    const $selectedLanguage = this.$target.querySelector('.SelectedLanguage');
    const $searchInput = this.$target.querySelector('.SearchInput');
    const $suggestion = this.$target.querySelector('.Suggestion');
    const { onSearchInputChanged, onArrowKeyup, onItemSelected } = this;
    const { languages, searchInputValue, selectedIndex } = this.$state;

    new SelectedLanguage($selectedLanguage, {

    });

    new SearchInput($searchInput, {
      inputValue: this.$state.searchInputValue,
      onSearchInputChanged: onSearchInputChanged.bind(this),
      onArrowKeyup: onArrowKeyup.bind(this),
      onItemSelected: onItemSelected.bind(this),
    });

    new Suggestion($suggestion, {
      items: languages,
      matchedText: searchInputValue,
      selectedIndex,
      onItemSelected: onItemSelected.bind(this),
    });
  }

  async onSearchInputChanged(newSearchInputValue) {
    const fetchedLanguages= await fetchLanguages(newSearchInputValue);
    this.setState({
      searchInputValue: newSearchInputValue,
      languages: fetchedLanguages,
    });
  };

  onItemSelected(item) {
    alert(item);
  }

  onArrowKeyup(keyType) {
    let { selectedIndex, languages } = this.$state;

    if (keyType === KEY_TYPE.ARROW_UP) {
      if (!selectedIndex) selectedIndex = languages.length - 1;
      else selectedIndex -= 1;
    }

    if (keyType === KEY_TYPE.ARROW_DOWN) {
      if (selectedIndex >= languages.length) selectedIndex = 0
      else selectedIndex += 1;
    }

    this.setState({ selectedIndex });
  }
}