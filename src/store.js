import Vue from 'vue'
import Vuex from 'vuex'
import {createDefaultElement} from "./utility/util";

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    counter: 1,
    pageElements: [],
    selectedElement: {},
    htmlText: ''
  },
  mutations: {
    initialiseStore(state) {
      if(localStorage.getItem('pagenote')) {
        state.pageElements = JSON.parse(localStorage.getItem('pagenote'));
      }
      if(localStorage.getItem('ecount')) {
        state.counter = JSON.parse(localStorage.getItem('ecount'));
      }
    },
    addTextElement(state, type) {
      const element = createDefaultElement({id: state.counter,type: type});
      state.pageElements.push(element);
      state.counter += 1;
    },
    removeTextElement(state) {
      const selectedId = state.selectedElement.id;
      state.selectedElement.selected = false;
      state.selectedElement.editable = false;
      state.selectedElement = {};
      state.htmlText = '';
      state.pageElements.splice(state.pageElements.findIndex(el => el.id === selectedId), 1);
    },
    selectElement(state, payload) {
      state.selectedElement.selected = false;
      state.selectedElement.editable = false;

      Vue.set(state, 'selectedElement', state.pageElements.find(element => element.id === payload.id))
      state.selectedElement.height = payload.h;
      state.selectedElement.width = payload.w;
      state.selectedElement.selected = true;
      state.htmlText = state.selectedElement.text;
    },
    moveElement(state, payload) {
      Vue.set(state.selectedElement, 'x', payload.x)
      Vue.set(state.selectedElement, 'y', payload.y)
    },
    pageSelected(state){
      state.selectedElement.text = state.htmlText;
      state.selectedElement.selected = false;
      state.selectedElement.editable = false;
      state.selectedElement = {};
    },
    updateProperties(state, payload) {
      for (var key in payload) {
        if(this.state.selectedElement.hasOwnProperty(key)) {
          Vue.set(state.selectedElement,key,payload[key]);
        }
      }
    },
    savePage(state){
      localStorage.setItem('pagenote',JSON.stringify(state.pageElements));
      localStorage.setItem('ecount',state.counter)
    },
    updateHtmlText(state, str) {
      state.htmlText = str;
    },
    clearPage(state) {
      localStorage.clear();
      state.counter = 1;
      state.selectedElement = {};
      state.pageElements = [];
    }
  },
  actions: {

  }
})
