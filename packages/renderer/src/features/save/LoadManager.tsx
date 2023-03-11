import {load} from './db';
import {Engine} from '/@/Engine';

export const LoadState: {
  Loaded: boolean;
  Error: boolean;
  ErrorReason: string;
  Reset(): void;
} = {
  Loaded: false,
  Error: false,
  ErrorReason: '',
  Reset: () => {
    LoadState.Loaded = false;
    LoadState.Error = false;
    LoadState.ErrorReason = '';
  },
};

export const loadData = async () => {
  LoadState.Reset();
  await load()
    .then(saveString => {
      Engine.load(saveString);
      LoadState.Loaded = true;
    })
    .catch(reason => {
      LoadState.Error = true;
      LoadState.ErrorReason = reason;
      Engine.load();
    });
};
