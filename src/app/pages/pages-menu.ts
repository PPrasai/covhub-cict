import { NbMenuItem } from '@nebular/theme';
import { HOME } from '../app.conf';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Case Tracing',
    icon: 'clipboard-outline',
    link: `${HOME}/tracing`
  },
  {
    title: 'Users',
    icon: 'people-outline',
    link: `${HOME}/users`
  },
  {
    title: 'Log Out',
    icon: 'undo-outline',
    link: `${HOME}/auth/logout`
  }
];
