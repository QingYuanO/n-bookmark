import bookmarkJson from '@/data/bookmark.json';
import { replaceChineseWithPinyin } from '@/lib/utils';

export type BookmarkFolder = {
  id: string;
  type: 'folder';
  name: string;
  count: number;
  folderId: string;
};

export type BookmarkFolderWithChildren = BookmarkFolder & { children: BookmarkFolderWithChildren[] };

export type BookmarkLink = { id: string; type: 'bookmark'; name: string; url: string; icon?: string };

export type BookmarkLinkWithChildren = BookmarkLink & { children: BookmarkLinkWithChildren[] };

export type Bookmark = (BookmarkFolder & { children: Bookmark[] }) | BookmarkLink;

const getBookmarkChildrenNum = (data: Bookmark): number => {
  if (data.type === 'folder' && data.children?.length) {
    return data.children.length + data.children.reduce((prev, curr) => prev + getBookmarkChildrenNum(curr), 0);
  } else {
    return 0;
  }
};

/**
 * 格式化数据
 * @param data 原始数据
 * @returns
 */
const formatBookmark = (data: Bookmark[]): Bookmark[] => {
  return data.map(item => {
    if (item.type === 'folder') {
      return {
        id: item.id,
        type: 'folder',
        name: item.name,
        folderId: replaceChineseWithPinyin(item.name),
        count: getBookmarkChildrenNum(item),
        children: item.children ? formatBookmark(item.children) : [],
      };
    } else {
      return {
        id: item.id,
        type: 'bookmark',
        name: item.name,
        url: item.url,
        icon: item.icon,
      };
    }
  });
};

/**
 * 将第一层数据全部格式化为是folder
 * @returns
 */
export const getBookmark = () => {
  const bookmarkData = formatBookmark(bookmarkJson as Bookmark[]);
  const folders = bookmarkData.filter(bk => bk.type === 'folder');
  const bookmarks = bookmarkData.filter(bk => bk.type === 'bookmark');
  folders.push({
    id: new Date().getTime().toString(),
    type: 'folder',
    name: '其他',
    count: bookmarks.length,
    folderId: 'other',
    children: bookmarks,
  });
  return folders;
};
export const bookmarks = getBookmark();

/**
 * 只返回 folder 数据
 * @param data
 * @returns
 */
const formatBookmarkDataOnlyFolder = (data: Bookmark[]): BookmarkFolderWithChildren[] => {
  return data
    .filter(item => item.type === 'folder')
    .map(item => {
      return {
        ...(item as BookmarkFolder),
        children: item.type === 'folder' && item.children ? formatBookmarkDataOnlyFolder(item.children) : [],
      };
    });
};
export const bookmarkFolders = formatBookmarkDataOnlyFolder(bookmarks);

const formatBookmarkDataOnlyLink = (data: Bookmark[]): BookmarkLink[] => {
  const links = data.filter(item => item.type === 'bookmark');
  const folder = data.filter(item => item.type === 'folder');

  return [
    ...links,
    ...(folder && folder.length > 0
      ? folder.reduce((t, c) => {
          return [...t, ...(c.type === 'folder' ? formatBookmarkDataOnlyLink(c.children) : [])];
        }, [] as BookmarkLink[])
      : []),
  ] as BookmarkLink[];
};
export const bookmarkLinks = formatBookmarkDataOnlyLink(bookmarks);

export const getBookmarkById = (id: string) => {
  return bookmarks.find(item => item.id === id);
};

export const getBreadcrumb = (folderIds: string[]) => {
  const data: { link: string; name: string }[] = [];

  const getData = (index: number, folders: BookmarkFolderWithChildren[], preFolder?: BookmarkFolderWithChildren) => {
    const folder = folders.find(item => item.folderId === folderIds[index]);
    if (folder) {
      data.push({ link: preFolder ? `/${preFolder.folderId}/${folder.folderId}` : `/${folder.folderId}`, name: folder.name });
      getData(index + 1, folder.children, folder);
    }
  };
  getData(0, bookmarkFolders);
  return data;
};

export const getBookmarkByFolderIds = (folderIds: string[]) => {
  const getData = (index: number, bks: Bookmark[]): Bookmark[] => {
    const folder = bks.find(item => item.type == 'folder' && item.folderId === folderIds[index]);
    if (folder) {
      return getData(index + 1, folder.type === 'folder' ? folder.children : []);
    } else {
      return bks;
    }
  };

  return getData(0, bookmarks);
};

export const getDynamicsRouteParams = () => {
  const params: string[][] = [];
  const getData = (folder: BookmarkFolderWithChildren, preParams: string[]) => {
    const d = [...preParams, folder.folderId];
    params.push([...preParams, folder.folderId]);
    if (folder.children?.length) {
      folder.children.forEach(item => {
        getData(item, d);
      });
    }
  };
  bookmarkFolders.forEach(item => {
    getData(item, []);
  });
  return params;
};
