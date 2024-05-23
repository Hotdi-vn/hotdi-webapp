'use client'

import FarmExplorer from '#/icons/farm_explorer.svg';
import FarmExplorerActive from '#/icons/farm_explorer_active.svg';
import Home from '#/icons/home.svg';
import HomeActive from '#/icons/home_active.svg';
import ShoppingBag from '#/icons/shopping_bag.svg';
import ShoppingBagBgGrey from '#/icons/shopping_bag_bg_grey.svg';
import User from '#/icons/user.svg';
import UserActive from '#/icons/user_active.svg';
import Shop from '#/icons/shop.svg';
import ShopActive from '#/icons/shop_active.svg';
import Message from '#/icons/message.svg';
import MessageActive from '#/icons/message_active.svg';
import Notification from '#/icons/notification.svg';
import Setting from '#/icons/setting.svg';
import NavigateRight from '#/icons/navigate_right.svg';
import NavigateLeft from '#/icons/navigate_left.svg';
import NavigateUp from '#/icons/navigate_up.svg';
import NavigateDown from '#/icons/navigate_down.svg';
import Back from '#/icons/back.svg';
import BackBgGrey from '#/icons/back_bg_grey.svg';
import Location from '#/icons/location.svg';
import Search from '#/icons/search.svg';
import CardReceive from '#/icons/card_receive.svg';
import CarSend from '#/icons/card_send.svg';
import More from '#/icons/more.svg';
import MoreBgGrey from '#/icons/more_bg_grey.svg';
import GalleryAdd from '#/icons/gallery_add.svg';
import Favorite from '#/icons/favorite.svg';
import FavoriteActive from '#/icons/favorite_active.svg';
import ShareBgGrey from '#/icons/share_bg_grey.svg';


const iconTypes = {
  home: Home,
  homeActive: HomeActive,
  farmExplorer: FarmExplorer,
  farmExplorerActive: FarmExplorerActive,
  shoppingBag: ShoppingBag,
  shoppingBagBgGrey: ShoppingBagBgGrey,
  user: User,
  userActive: UserActive,
  shop: Shop,
  shopActive: ShopActive,
  message: Message,
  messageActive: MessageActive,
  notification: Notification,
  setting: Setting,
  back: Back,
  backBgGrey: BackBgGrey,
  location: Location,
  search: Search,
  cardReceive: CardReceive,
  cardSend: CarSend,
  more: More,
  moreBgGrey: MoreBgGrey,
  galleryAdd: GalleryAdd,
  favorite: Favorite,
  FavoriteActive: FavoriteActive,
  navigateDown: NavigateDown,
  navigateUp: NavigateUp,
  navigateRight: NavigateRight,
  navigateLeft: NavigateLeft,
  shareBgGrey: ShareBgGrey
};

const IconComponent = ({ name, ...props }) => {
  let Icon = iconTypes[name];
  return <Icon {...props} />;
};

export default IconComponent;