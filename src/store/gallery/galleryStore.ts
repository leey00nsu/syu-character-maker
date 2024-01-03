import { create } from 'zustand';

import { FilterSlice, createFilterSlice } from './filterSlice';

const useGalleryStore = create<FilterSlice>()((...all) => ({
  ...createFilterSlice(...all),
}));

export default useGalleryStore;
