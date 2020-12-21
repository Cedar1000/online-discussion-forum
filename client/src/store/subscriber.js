import store from '@/store';
import axios from 'axios';

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
  }
});
