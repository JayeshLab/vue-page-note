import Vue from 'vue'
import Vuex from 'vuex'
import { createDefaultElement } from "./utility/util";
import uid from './utility/uid';
import api from './utility/storage';

Vue.use(Vuex)
const autoSaveActions = ["addTextElement", "updateHtmlText", "addImageElement", "removeElement" , "updatePageTitle"];
const autoSaveFont = ["addFont","delFont"];
const autosaverPlugin = function (store) {
  store.subscribe(function (mutation, state) {
    if(autoSaveActions.includes(mutation.type)) {
      api.savePage(state.currentPage);
    }
    else if(autoSaveFont.includes(mutation.type)) {
      api.saveFonts(state.fonts);
    }
  })
}
export default new Vuex.Store({
  strict: true,
  state: {
    pages: [],
    currentPage: {},
    selectedPageElements: {},
    selectedElement: {},
    selected: "",
    editable: "",
    formatEvent: ['color','#000000'],
    isOpen: "",
    fonts: api.getFonts()
  },
  getters: {
    getElement: (state) => (id) => {
      return state.selectedPageElements[id];
    },
    getOpenState: (state) => (id) => {
      return state.isOpen === id;
    }
  },
  actions: {
    initialiseStore({ commit }) {
      const { pages, currentPage } = api.loadPages();
      commit('setCurrentPage', currentPage);
      commit('setElements', currentPage.elements);
      commit('setPages', pages);
    },
    addNewPage({ commit }) {
      commit('unSelectElement');
      const page = api.createNewPage();
      commit('setCurrentPage', page);
      commit('setElements', page.elements);
      commit('addPage', page);
    },
    selectPage({commit, state}, payload) {
      commit('unSelectElement');
      api.setCurrentPageId(payload);
      const page = state.pages.find(p => p.pid === payload);
      commit('setCurrentPage', page);
      commit('setElements', page.elements);
    },
    deletePage({commit, state}, payload) {
      commit('unSelectElement');
      const pages = state.pages.filter(page => page.pid !== payload);
      if(pages.length > 0) {
        commit('setCurrentPage', pages[0]);
        commit('setElements', pages[0].elements);
        commit('setPages', pages);
      }
      else {
        const page = api.createNewPage();
        commit('setCurrentPage', page);
        commit('setElements', page.elements);
        commit('addPage', page);
      }
    }
  },
  mutations: {
    setPages(state, payload) {
      state.pages = payload;
    },
    addPage(state, payload) {
      state.pages.push(payload);
    },
    updatePageTitle(state, payload) {
      Vue.set(state.currentPage, 'title', payload );
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    setElements(state, payload) {
      state.selectedPageElements = payload;
    },
    addTextElement(state, type) {
      const id = `EL_${uid(32)}` ;
      const size = Object.keys(state.selectedPageElements).length;
      const element = createDefaultElement({id: id, type: type, z: size + 1});
      Vue.set(state.selectedPageElements, id , element);
    },
    onPositionChange(state) {
      api.savePage(state.currentPage);
    },
    addImageElement(state, payload) {
      const id = `EL_${uid(32)}` ;
      const size = Object.keys(state.selectedPageElements).length;
      const element = createDefaultElement({id: id, type: 'ImageElement', content: payload.image, z: size + 1, height: payload.height, width: payload.width});
      Vue.set(state.selectedPageElements, id , element);
    },
    addFont(state, payload) {
      state.fonts.push(payload);
    },
    delFont(state, payload) {
      var index = state.fonts.indexOf(payload);
      if (index > -1) {
        state.fonts.splice(index, 1);
      }
    },
    removeElement(state) {
      const selectedId = state.selectedElement.id;
      state.selected = "";
      state.editable = "";
      state.selectedElement = {};
      Vue.delete(state.selectedPageElements, selectedId);
    },
    selectElement(state, payload) {
      state.editable = "";
      state.selected = payload.id;
      const element = Object.assign(state.selectedPageElements[payload.id], {
        height:payload.h,
        width:payload.w
      });
      Vue.set(state, 'selectedElement', element);
    },
    moveElement(state, payload) {
      Vue.set(state.selectedElement, 'x', payload.x)
      Vue.set(state.selectedElement, 'y', payload.y)
    },
    pageSelected(state){
      state.editable = "";
      state.selected = "";
      state.selectedElement = {};
    },
    updateProperties(state, payload) {
      for (var key in payload) {
        if(Object.prototype.hasOwnProperty.call(this.state.selectedElement, key)) {
          Vue.set(state.selectedElement,key,payload[key]);
        }
      }
    },
    setEditable(state, payload) {
      state.editable = payload;
    },
    unSelectElement(state) {
      state.selected = "";
      state.editable = "";
    },
    updateHtmlText(state, { txt, h, w }) {
      Vue.set(state.selectedElement, 'content', txt);
      Vue.set(state.selectedElement, 'height', h);
      Vue.set(state.selectedElement, 'witdh', w);
    },
    setFormatEvent(state, payload) {
      state.formatEvent = payload;
    },
    clearPage(state) {
      for (let ele in state.selectedPageElements){
        Vue.delete(state.selectedPageElements, ele);
      }
      api.setPage(state.currentPage);
    },
    setIsOpen(state, payload){
      state.isOpen = payload[1] ? payload[0]: ""
    }
  },
  plugins: [autosaverPlugin]
})
