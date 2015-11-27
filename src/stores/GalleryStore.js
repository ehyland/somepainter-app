import BaseStore from "fluxible/addons/BaseStore";
import Actions from "../constants/Actions";

class GalleryStore extends BaseStore {

  static storeName = "GalleryStore";

  static handlers = {
    [Actions.LOAD_EVENTS_SUCCESS]: "handleReceiveGalleries"
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.galleries = [];
  }

  handleReceiveGalleries ({galleries=[]}) {
    galleries.forEach(gallery => {
      const index = this.galleries.findIndex(testGal => testGal.ID === gallery.ID);
      if (index === -1) {
        this.galleries.push(gallery);
      }else {
        this.galleries.splice(index, 1, gallery);
      }
    });
    this.emitChange();
  }

  getGalleries () {
    return this.galleries;
  }

  getGalleryByID (id) {
    return this.galleries.find(gallery => gallery.ID === id);
  }

  // For sending state to the client
  dehydrate () {
    return {
      galleries: this.galleries
    };
  }

  // For rehydrating server state
  rehydrate (state) {
    this.galleries = state.galleries;
  }
}

export default GalleryStore;
