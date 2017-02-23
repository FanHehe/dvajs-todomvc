export default {

  namespace: 'todo',

  state: {
      list: [{ content: 'message', checked: false }],
      filter: 'all',
      checkall: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    unshift (state, action) {
        const { list } = state;
        const { data } = action.payload;
        const newList = Object.assign([], list);
        newList.unshift(data);
        return { ...state, list: newList };

      },
    filter (state, action) {
        const { filter } = action.payload;
        return { ...state, filter };
    },
    check (state, action) {
        const { list } = state;
        const { index } = action.payload;
        const newList = list.map ((item, which) => {
            if (which === index) item.checked = !item.checked;
            return item;
        });
        return { ...state, list: newList };
    },
    checkAll (state, action) {
        const { list, checkAll } = state;
        const newList = list.map(item => {
            item.checked = !checkAll;
            return item;
        });
        return { ...state, list: newList, checkAll: !checkAll };
    },
    clearOne (state, action) {
        const { list } = state;
        const { index } = action.payload;
        const newList = list.filter((item, which) =>  which !== index);
        return { ...state, list: newList };
    },
    clearCompleted (state, action) {
        const { list } = state;
        const newList = list.filter(item => !item.checked)
        return { ...state, list: newList };
    },
  },

};
