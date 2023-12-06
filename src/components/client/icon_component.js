'use client'

import FarmExplorer from '#/icons/farm_explorer.svg';
import Home from '#/icons/home.svg';
import ShoppingBag from '#/icons/shopping_bag.svg';
import User from '#/icons/user.svg';

const iconTypes = {
  home: Home,
  farmExplorer: FarmExplorer,
  shoppingBag: ShoppingBag,
  user: User,
};

const IconComponent = ({name, ...props }) => {
  let Icon = iconTypes[name];
  return <Icon {...props} />;
};

export default IconComponent;