import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';
import { getDefaultBuild } from '@/contexts/build/reducer';
import { BuildState } from '@/contexts/build/types';

export type GlobalState = {
  builds: BuildState[],
  activeBuildIndex: number,
};

export type GlobalDispatchAction =
{ type: 'CREATE_BUILD' }
| { type: 'DUPLICATE_BUILD' }
| { type: 'DELETE_BUILD' }
| { type: 'UPDATE_BUILD', data: BuildState }
| { type: 'SET_ACTIVE_BUILD', index: number };

export function getInitialState(): GlobalState {
  let initialBuilds: BuildState[] = [];
  let initialIndex: number = 0;

  try {
    const buildsJson = window.localStorage.getItem('builds');
    if (buildsJson) {
      // TODO: validation
      initialBuilds = JSON.parse(buildsJson);
    }
    const indexJson = window.sessionStorage.getItem('active-build');
    if (indexJson) {
      initialIndex = parseInt(indexJson);
    }
  } catch (e) {
    console.error(e);
  }

  if (initialBuilds.length === 0) {
    initialBuilds = [getDefaultBuild()];
  }
  if (initialIndex >= initialBuilds.length) {
    initialIndex = 0;
  }

  return {
    builds: initialBuilds,
    activeBuildIndex: initialIndex,
  };
}

export function reducer(state: GlobalState, action: GlobalDispatchAction): GlobalState {
  switch (action.type) {
    case 'CREATE_BUILD': {
      const newBuilds = [
        ...state.builds,
      ];
      const newBuild = getDefaultBuild();
      const newIndex = newBuilds.push(newBuild) - 1;
      return {
        builds: newBuilds,
        activeBuildIndex: newIndex,
      };
    }
    case 'DUPLICATE_BUILD': {
      const activeBuild = state.builds[state.activeBuildIndex];
      if (!activeBuild) return state;
      const newBuilds = [
        ...state.builds,
      ];
      const newBuild = cloneDeep(activeBuild);
      newBuild.id = nanoid();
      const newIndex = newBuilds.push(newBuild) - 1;
      return {
        builds: newBuilds,
        activeBuildIndex: newIndex,
      };
    }
    case 'DELETE_BUILD': {
      const newBuilds = state.builds.filter((build, index) => index !== state.activeBuildIndex);
      if (newBuilds.length === 0) {
        return {
          builds: [getDefaultBuild()],
          activeBuildIndex: 0,
        };
      }
      let newIndex = state.activeBuildIndex;
      if (newIndex >= newBuilds.length) {
        newIndex = newBuilds.length - 1;
      }
      return {
        builds: newBuilds,
        activeBuildIndex: newIndex,
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
        builds: newBuilds,
        activeBuildIndex: state.activeBuildIndex,
      };
    }
    case 'SET_ACTIVE_BUILD': {
      return {
        builds: state.builds,
        activeBuildIndex: action.index,
      };
    }
    default:
      return state;
  }
}
