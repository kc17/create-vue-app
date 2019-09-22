/* eslint-disable */
export default function ({
  errorHandler = (context, err) => {},
} = {
  errorHandler: (context, err) => {},
}) {
  return function (store) {
    store.registerModule('$api', {
      namespaced: true,

      state: {
        pending: {},
        error: {},
      },

      mutations: {
        REQUEST_PENDING(state, { action }) {
          state.pending = { ...state.pending, [action]: true };
          state.error = { ...state.error, [action]: null };
        },
        REQUEST_SUCCESS(state, { action }) {
          state.pending = { ...state.pending, [action]: false };
        },
        REQUEST_FAILURE(state, { action, error }) {
          state.pending = { ...state.pending, [action]: false };
          state.error = { ...state.error, [action]: error };
        },
        // eslint-disable-next-line
        CLEAR(state) {
          state = Object.assign(state, JSON.parse(JSON.stringify(INITIAL_STATE)));
        },
        CLEAR_ERROR(state) {
          state.error = {};
        },
        CLEAR_ERROR_BY_ACTION(state, action) {
          state.error = { ...state.error, [action]: null };
        },
      },

      actions: {
        clear(context) {
          context.commit('CLEAR');
        },
        clearError(context) {
          context.commit('CLEAR_ERROR');
        },
        clearErrorByAction(context, action) {
          context.commit('CLEAR_ERROR_BY_ACTION', action);
        },
        observer(context, action) {
          const isBrowser = typeof window !== 'undefined';
          return (promise) => {
            if (isBrowser) context.commit('REQUEST_PENDING', { action });

            return promise
              .then((res) => {
                context.commit('REQUEST_SUCCESS', { action });
                return [res, null];
              })
              .catch((err) => {
                context.commit('REQUEST_FAILURE', { action, error:  err });
                errorHandler(context, err);
                return [undefined, err];
              });
          }
        }
      },

      getters: {
        pending: (state) => (action) => state.pending[action],
        error: (state) => (action) => state.error[action],
      }
    });
  };
}