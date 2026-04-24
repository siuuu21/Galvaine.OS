/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppId = 'games' | 'gamepix' | 'iospace';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileItem[];
  icon?: string;
}

export interface SystemTheme {
  mode: 'light' | 'dark';
  wallpaper: string;
}
