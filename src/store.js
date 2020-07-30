import Vue from 'vue'
import Vuex from 'vuex'
import {createDefaultElement} from "./utility/util";
import uid from './utility/uid';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    pageElements: {},
    selectedElement: {}
  },
  getters: {
    getElement: (state) => (id) => {
      return state.pageElements[id];
    }
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
      const id = uid(32);
      const element = createDefaultElement({id: id, type: type});
      Vue.set(state.pageElements, id , element);
    },
    removeTextElement(state) {
      const selectedId = state.selectedElement.id;
      state.selectedElement.selected = false;
      state.selectedElement.editable = false;
      state.selectedElement = {};
      Vue.delete(state.pageElements, selectedId);
    },
    selectElement(state, payload) {
      state.selectedElement.selected = false;
      state.selectedElement.editable = false;
      Vue.set(state, 'selectedElement', state.pageElements[payload.id])
      state.selectedElement.height = payload.h;
      state.selectedElement.width = payload.w;
      state.selectedElement.selected = true;
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
      state.pageElements
      localStorage.setItem('pagenote',JSON.stringify(state.pageElements));
    },
    updateHtmlText(state, str) {
      state.selectedElement.text = str;
      state.selectedElement.tmpText = '';
    },
    appendHtmlText(state, str) {
      if(state.selectedElement) {
        Vue.set(state.selectedElement, 'tmpText', str);
      }
    },
    clearPage(state) {
      localStorage.clear();
      state.selectedElement = {};
      state.pageElements = {};
    }
  },
  actions: {

  }
})
