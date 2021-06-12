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

    case 'setError':
      bus.$emit('stopLoading');
      break;

    case 'updateUser':
      bus.$emit('stopLoading');
      break;

    case 'setUser':
      bus.$emit('join-room');
      break;

    case 'addPost':
      bus.$emit('newPost');
      break;

    case 'setPostCategories':
      bus.$emit('set-posts');
      bus.$emit('scroll-down');
      break;

    case 'appendPosts':
      bus.$emit('append-posts');
      break;

    case 'setUsers':
      bus.$emit('set-users');
      break;

    case 'setRole':
      bus.$emit('set-role');
      break;
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
