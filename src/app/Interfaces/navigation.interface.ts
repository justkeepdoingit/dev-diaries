export interface INavItems {
  nav_name: string;
  nav_url: string;
  sub_nav?: INavItems[];
}
