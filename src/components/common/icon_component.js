'use client'

import FarmExplorer from '#/icons/farm_explorer.svg';
import FarmExplorerActive from '#/icons/farm_explorer_active.svg';
import Home from '#/icons/home.svg';
import HomeActive from '#/icons/home_active.svg';
import ShoppingBag from '#/icons/shopping_bag.svg';
import User from '#/icons/user.svg';
import UserActive from '#/icons/user_active.svg';
import Shop from '#/icons/shop.svg';
import ShopActive from '#/icons/shop_active.svg';
import Message from '#/icons/message.svg';
import Notification from '#/icons/notification.svg';
import Setting from '#/icons/setting.svg';
import ArrowRight from '#/icons/arrow_right.svg';
import ArrowLeft from '#/icons/arrow_left.svg';
import Location from '#/icons/location.svg';
import Search from '#/icons/search.svg';
import CardReceive from '#/icons/card_receive.svg';
import CarSend from '#/icons/card_send.svg';
import More from '#/icons/more.svg';

const iconTypes = {
  home: Home,
  homeActive: HomeActive,
  farmExplorer: FarmExplorer,
  farmExplorerActive: FarmExplorerActive,
  shoppingBag: ShoppingBag,
  user: User,
  userActive: UserActive,
  shop: Shop,
  shopActive: ShopActive,
  message: Message,
  notification: Notification,
  setting: Setting,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  location: Location,
  search: Search,
  cardReceive: CardReceive,
  cardSend: CarSend,
  more: More,
};

const IconComponent = ({ name, ...props }) => {
  let Icon = iconTypes[name];
  return <Icon {...props} />;
};

export default IconComponent;