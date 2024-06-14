import ShopifyBuy, { ConfigAttrs, Client } from 'shopify-buy';
import ShopifyModule from '<%= options.shopifyPath %>';
import { Context } from '@nuxt/types';
import 'isomorphic-unfetch';

interface ShopifyConfig extends ConfigAttrs {
  language: string;
}

export default async (
  ctx: Context & { $shopify: Client },
  inject: (name: string, value: unknown) => void
): Promise<void> => {
  // Configuration for Shopify client
  const config: ShopifyConfig = {
    domain: '<%= options.domain %>',
    storefrontAccessToken: '<%= options.storefrontAccessToken %>',
    language: '<%= options.language %>',
  };

  // Create a Shopify client instance
  const client: Client = ShopifyModule.buildClient(config);

  // Extend the client with a custom buildClient method
  Object.assign(client, {
    buildClient: (options: ShopifyConfig, fetchClient: typeof fetch) => {
      const newClient: Client = ShopifyModule.buildClient(options, fetchClient);
      ctx.$shopify = newClient;
      ctx.app.$shopify = newClient;
      inject('shopify', newClient);
    },
  });

  // Inject Shopify client into the Nuxt context
  ctx.$shopify = client;
  inject('shopify', client);
};
