import store from '@/store';
import axios from 'axios';
import { bus } from '../main';

store.subscribe((mutation) => {
  switch (mutation.type) {
    case 'setToken':
      if (mutation.payload) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${mutation.payload}`;

        localStorage.setItem('token', mutation.payload);
      } else {
        axios.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem('token');
      }
      break;
    case 'addPost':
      bus.$emit('emitSub');
  }
});

store.subscribe((action) => {
  switch (action.type) {
    case 'setUser':
      if (action.payload) {
        store.dispatch('getUserNotifications');
      }
  }
});
