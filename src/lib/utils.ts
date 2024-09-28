import { clsx, type ClassValue } from 'clsx';
import { pinyin } from 'pinyin-pro';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 将字符串中的中文替换为拼音
 * @param inputString
 * @returns
 */
// 函数：将字符串中的中文替换为拼音
export function replaceChineseWithPinyin(inputString: string) {
  // 替换输入字符串中的 / 空格 符号为 -
  inputString = inputString.replace(/[\/\s\?\&\=\#\%\+]/g, '-');
  // 检查字符串中是否包含中文字符的正则表达式
  const containsChinese = /[\u4e00-\u9fa5]/;
  let result = '';
  let currentChinese = '';

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];
    if (containsChinese.test(char)) {
      // 如果字符是中文，则添加到当前的中文字符缓冲区
      currentChinese += char;
    } else {
      // 如果当前字符不是中文并且有缓冲的中文字符，则将缓冲的中文字符转换为拼音
      if (currentChinese) {
        const pinyinArray = pinyin(currentChinese, { type: 'array', toneType: 'none' });
        result += `-${pinyinArray.join('-')}-`;
        currentChinese = '';
      }
      // 添加当前非中文字符
      result += char;
    }
  }

  // 检查最后是否有未处理的中文字符
  if (currentChinese) {
    const pinyinArray = pinyin(currentChinese, { type: 'array', toneType: 'none' });
    result += `-${pinyinArray.join('-')}-`;
  }

  return result.toLocaleLowerCase().replace(/^-+|-+$/g, '');
}
