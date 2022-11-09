import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import {
  Home,
  Tv,
  Smile,
  User,
  Cast,
  Calendar,
  Users,
  Youtube,
  Settings,
  Trash2,
  Globe,
  FilePlus,
  FileMinus,
  UserPlus,
  CornerDownLeft,
  CornerDownRight,
  Shuffle,
  LogIn,
  LogOut,
} from 'angular-feather/icons';

const icons = {
  Home,
  Tv,
  Smile,
  User,
  Cast,
  Calendar,
  Users,
  Youtube,
  Settings,
  Trash2,
  Globe,
  FilePlus,
  FileMinus,
  UserPlus,
  CornerDownLeft,
  CornerDownRight,
  Shuffle,
  LogIn,
  LogOut,
};

@NgModule({
  imports: [CommonModule, FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconModule { }