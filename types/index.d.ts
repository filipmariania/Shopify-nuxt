import * as ShopifyBuy from 'shopify-buy';

declare module '@nuxt/vue-app' {
  interface Context {
    $shopify: ShopifyBuy.Client;
  }

  interface NuxtAppOptions {
    $sentry: ShopifyBuy.Client;
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $sentry: ShopifyBuy.Client;
  }

  interface NuxtAppOptions {
    $sentry: ShopifyBuy.Client;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $shopify: ShopifyBuy.Client;
  }
}

declare module 'vuex' {
  interface Store<S> {
    $shopify: ShopifyBuy.Client;
  }
}
