import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';
import { getDefaultBuild } from '@/contexts/build/reducer';
import { BuildState } from '@/contexts/build/types';

export type GlobalState = {
  builds: BuildState[],
  activeTab: string | null,
};

export type GlobalDispatchAction =
{ type: 'CREATE_BUILD' }
| { type: 'CREATE_BUILD_IF_NONE' }
| { type: 'UPDATE_BUILD', data: BuildState }
| { type: 'DUPLICATE_BUILD', id: string }
| { type: 'DELETE_BUILD', id: string }
| { type: 'SET_ACTIVE_TAB', id: string | null };

export function getInitialState(): GlobalState {
  let initialBuilds: BuildState[] = [];
  let initialTab: string | null = null;

  try {
    const buildsJson = window.localStorage.getItem('builds');
    if (buildsJson) {
      // TODO: validation
      initialBuilds = JSON.parse(buildsJson);
    }
    const tabJson = window.sessionStorage.getItem('active-tab');
    if (tabJson) {
      initialTab = tabJson;
    }
  } catch (e) {
    console.error(e);
  }
  return {
    builds: initialBuilds,
    activeTab: initialTab,
  };
}

export function reducer(state: GlobalState, action: GlobalDispatchAction): GlobalState {
  switch (action.type) {
    case 'CREATE_BUILD': {
      const newBuilds = [
        ...state.builds,
      ];
      const newBuild = getDefaultBuild();
      newBuilds.push(newBuild);
      return {
        ...state,
        builds: newBuilds,
        activeTab: newBuild.id,
      };
    }
    case 'CREATE_BUILD_IF_NONE': {
      if (state.builds.length > 0) return state;
      const newBuilds = [
        ...state.builds,
      ];
      const newBuild = getDefaultBuild();
      newBuilds.push(newBuild);
      return {
        ...state,
        builds: newBuilds,
        activeTab: newBuild.id,
      };
    }
    case 'UPDATE_BUILD': {
      const newBuilds = state.builds.map((build) => {
        if (build.id === action.data.id) {
          return action.data;
        }
        return build;
      });
      return {
        ...state,
        builds: newBuilds,
      };
    }
    case 'DUPLICATE_BUILD': {
      const targetBuild = state.builds.find((build) => build.id === action.id);
      if (!targetBuild) return state;
      const newBuilds = [
        ...state.builds,
      ];
      const newBuild = cloneDeep(targetBuild);
      newBuild.id = nanoid();
      newBuilds.push(newBuild);
      return {
        ...state,
        builds: newBuilds,
        activeTab: newBuild.id,
      };
    }
    case 'DELETE_BUILD': {
      const newBuilds = state.builds.filter((build) => build.id !== action.id);
      let newActiveTab = '';
      if (newBuilds[0]) {
        newActiveTab = newBuilds[0].id;
      }
      const newState = {
        ...state,
        builds: newBuilds,
        activeTab: newActiveTab,
      };
      if (!newState.builds[0]) {
        return reducer(newState, { type: 'CREATE_BUILD_IF_NONE' });
      }
      return {
        ...state,
        builds: newBuilds,
        activeTab: newActiveTab,
      };
    }
    case 'SET_ACTIVE_TAB': {
      return {
        ...state,
        activeTab: action.id,
      };
    }
    default:
      return state;
  }
}
