'use client'

import FarmExplorer from '#/icons/farm_explorer.svg';
import FarmExplorerActive from '#/icons/farm_explorer_active.svg';
import Home from '#/icons/home.svg';
import HomeActive from '#/icons/home_active.svg';
import ShoppingBag from '#/icons/shopping_bag.svg';
import User from '#/icons/user.svg';
import UserActive from '#/icons/user_active.svg';

const iconTypes = {
  home: Home,
  homeActive: HomeActive,
  farmExplorer: FarmExplorer,
  farmExplorerActive: FarmExplorerActive,
  shoppingBag: ShoppingBag,
  user: User,
  userActive: UserActive,
};

const IconComponent = ({ name, ...props }) => {
  let Icon = iconTypes[name];
  return <Icon {...props} />;
};

export default IconComponent;