import Vue from 'vue'
import Vuex from 'vuex'
import {createDefaultElement} from "./utility/util";
import uid from './utility/uid';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    pageElements: {},
    selectedElement: {},
    formatEvent: ['color','#000000'],
    isOpen: ""
  },
  getters: {
    getElement: (state) => (id) => {
      return state.pageElements[id];
    },
    getOpenState: (state) => (id) => {
      return state.isOpen === id;
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
    addImageElement(state, payload) {
      const id = uid(32);
      const element = createDefaultElement({id: id, type: 'ImageElement', image: payload.image, height: payload.height, width: payload.width, text: ''});
      Vue.set(state.pageElements, id , element);
    },
    removeElement(state) {
      const selectedId = state.selectedElement.id;
      state.selectedElement.selected = false;
      state.selectedElement.editable = false;
      state.selectedElement = {};
      Vue.delete(state.pageElements, selectedId);
    },
    selectElement(state, payload) {
      const prevElement = state.selectedElement;
      if(prevElement) {
        Vue.set(state.selectedElement, 'editable', false);
        Vue.set(state.selectedElement, 'selected', false);
      }
      const element = Object.assign(state.pageElements[payload.id], {
        height:payload.h,
        width:payload.w,
        tmpText: '',
        selected: true
      });
      Vue.set(state, 'selectedElement', element);
    },
    moveElement(state, payload) {
      Vue.set(state.selectedElement, 'x', payload.x)
      Vue.set(state.selectedElement, 'y', payload.y)
    },
    pageSelected(state){
      Vue.set(state.selectedElement, 'editable', false);
      Vue.set(state.selectedElement, 'selected', false);
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
    updateHtmlText(state, obj) {
      Vue.set(state.selectedElement, 'text', obj.txt);
      Vue.set(state.selectedElement, 'tmpText','');
      Vue.set(state.selectedElement, 'height', obj.h);
      Vue.set(state.selectedElement, 'witdh', obj.w);
    },
    setFormatEvent(state, payload) {
      if(state.selectedElement) {
        state.formatEvent = payload;
      }
    },
    clearPage(state) {
      localStorage.clear();
      state.selectedElement = {};
      state.pageElements = {};
    },
    setIsOpen(state, payload){
      state.isOpen = payload[1] ? payload[0]: ""
    }
  },
  actions: {

  }
})
