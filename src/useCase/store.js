import React, { useReducer, createContext, useContext } from 'react';

// Initialize State
export const StoreContext = createContext();
StoreContext.displayName = 'StoreContext';

const initialState = {
  navOpenState: '',
  scrollPosition: 0,
  loadingState: false,
  isInLightSection: false,
  smoothScroll: null,
  fontIsLoaded: false,
  resized: 0,
  location: '',
  currentPage: '',
  colors: []
};

// Reducer to handle state updates
function storeReducer(state, action) {
  switch (action.type) {
    case 'SET_NAV_STATE': {
      return {
        ...state,
        navOpenState: action.state,
      };
    }

    case 'SET_COLORS': {
      return {
        ...state,
        colors: action.colors,
      };
    }

    case 'SET_LOADING': {
      return {
        ...state,
        loadingState: action.progress,
      };
    }

    case 'SET_SCROLL_POSITION': {
      return {
        ...state,
        scrollPosition: action.position,
      };
    }

    case 'SET_IS_IN_LIGHT_SSECTION': {
      return {
        ...state,
        isInLightSection: action.light,
      };
    }

    case 'SET_SMOOTH_SCROLL': {
      return {
        ...state,
        smoothScroll: action.scroll,
      }
    }

    case 'UPDATE_RESIZED': {
      return {
        ...state,
        resized: state.resized + 1,
      }
    }

    case 'SET_LOCATION': {
      return {
        ...state,
        location: state.location,
      }
    }

    case 'SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }

    case 'LOAD_FONTS': {
      return {
        ...state,
        fontIsLoaded: true,
      }
    }

    default:
      throw new Error('Bad action type');
  }
}

// Actions
export const setColors = (dispatch, colors) =>
  dispatch({ type: 'SET_COLORS', colors });

export const setNavState = (dispatch, state) =>
  dispatch({ type: 'SET_NAV_STATE', state });

export const setLoading = (dispatch, progress) =>
  dispatch({ type: 'SET_LOADING', progress });

export const setScrollPosition = (dispatch, position) =>
  dispatch({ type: 'SET_SCROLL_POSITION', position });

export const setIsInLightSection = (dispatch, light) =>
  dispatch({ type: 'SET_IS_IN_LIGHT_SSECTION', light })

export const setSmoothScroll = (dispatch, scroll) =>
  dispatch({ type: 'SET_SMOOTH_SCROLL', scroll })

export const setCurrentPage = (dispatch, currentPage) =>
  dispatch({ type: 'SET_CURRENT_PAGE', currentPage })

export const setLocation = (dispatch, location) =>
  dispatch({ type: 'SET_LOCATION', location })

export const loadFonts = dispatch => dispatch({ type: 'LOAD_FONTS' })

export const updateResized = dispatch => dispatch({ type: 'UPDATE_RESIZED' })

// Store Provider to wrap the app
function StoreProvider(props) {
  const [store, dispatch] = useReducer(storeReducer, initialState);
  const value = [store, dispatch];

  return <StoreContext.Provider value={value} {...props} />;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return context;
}

// Main store wrapper component
function Store(props) {
  const { children } = props;
  return <StoreProvider>{children}</StoreProvider>;
}


export default Store;
