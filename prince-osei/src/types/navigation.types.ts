export interface NavItem {
  path: string;
  label: string;
  icon: string;
  badge?: number;
}

export interface AdminNavItem extends NavItem {
  active?: boolean;
}

export type MaterialIconName =
  | 'home'
  | 'dashboard'
  | 'article'
  | 'portfolio'
  | 'contact_page'
  | 'person'
  | 'settings'
  | 'login'
  | 'logout'
  | 'arrow_back'
  | 'add'
  | 'edit'
  | 'delete'
  | 'edit_note'
  | 'folder_shared'
  | 'visibility'
  | 'visibility_off'
  | 'menu'
  | 'close'
  | 'search'
  | 'filter_list'
  | 'notifications'
  | 'mail'
  | 'alternate_email'
  | 'architecture'
  | 'phone'
  | 'location_on'
  | 'calendar_today'
  | 'trending_up'
  | 'trending_down'
  | 'star'
  | 'star_border'
  | 'bookmark'
  | 'bookmark_border'
  | 'share'
  | 'download'
  | 'save'
  | 'cancel'
  | 'check'
  | 'chevron_left'
  | 'chevron_right'
  | 'expand_more'
  | 'expand_less'
  | 'more_vert'
  | 'account_circle'
  | 'call'
  | 'lock'
  | 'key'
  | 'help'
  | 'arrow_forward'
  | 'open_in_new'
  | 'north_east'
  | 'pentagon';
