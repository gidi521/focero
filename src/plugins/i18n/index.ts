// vue-i18n
import { type I18n, createI18n } from "vue-i18n";
import { computed } from 'vue'
import type { App, WritableComputedRef } from "vue";


const siphonI18n = (function () {
  let cache = Object.fromEntries(
    Object.entries(
      import.meta.glob("./lang/*.ts", { eager: true })
    ).map(([key, value]: any) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value.default];
    })
  );

  return (prefix = "zh-CN") => {
    return cache[prefix];
  };
})();

export const messagesData: { [key: string]: any } = {
  en: {
    langName: 'English',
    ...siphonI18n("en")
  },
  'zh-cn': {
    langName: '简体中文',
    ...siphonI18n("zh-cn")
  },
 
  ja: {
    langName: '日本語',
    ...siphonI18n("ja")
  }
   
  de: {
    langName: 'Deutsch',
    ...siphonI18n("de")
  }
 es: {
    langName: 'Español',
    ...siphonI18n("es")
  }
};

const language = computed(() => {
  return localStorage.getItem('languageKey') ?? 'en'
})

// 创建i18n实例
export const i18n: I18n = createI18n({
  globalInjection: true, // 全局注入属性和函数
  fallbackLocale: 'en', // 回退、备选语言
  legacy: false,  // 使用Composition API模式
  locale: language.value,
  messages: messagesData  // 语言包
});
