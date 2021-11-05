import { RootStore } from '../RootStore';
import { useContext } from 'react';
import { StoreContext } from './storeContext';

export const useStore = (): RootStore => useContext(StoreContext);
