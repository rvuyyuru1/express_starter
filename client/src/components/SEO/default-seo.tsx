import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import { siteSettings } from '../../settings/site-settings';

export const DefaultSeo = () => {
  return (
    <NextDefaultSeo
      title={siteSettings.name}
      titleTemplate={`${siteSettings.name} | %s`}
      defaultTitle={siteSettings.name}
      description={siteSettings.description}
      canonical="https://kwikbox.in/"
      openGraph={{
        title: siteSettings.name,
        description: siteSettings.description,
        type: 'website',
        locale: 'en_IE',
        site_name: siteSettings.name,
        images: [
          {
            url: 'https://kwikbox.in',
            width: 800,
            height: 600,
            alt: 'KWIKBOX',
          },
        ],
      }}
      twitter={{
        handle: '@kwikbox',
        site: '@kwikbox',
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: 'kwikbox, KWIKBOX, quick, kwick, kwikBOX, kwik-box, Quickbox, Quickbox-app, KWIKBOX-app, Online Shopping in India,online Shopping store,Online Shopping Site,Buy Online,Shop Online,Online Shopping',
        },
        {
          name: 'robots',
          content: 'index, follow',
        },
        {
          name: 'author',
          content: 'KWIKBOX',
        },
        {
          name: 'viewport',
          content: 'width=device-width, viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,height=device-height',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black',
        },

        {
          name: 'format-detection',
          content: 'telephone=no',
        },
        {
          name: 'HandheldFriendly',
          content: 'true',
        },
        {
          name: 'color-scheme',
          content: 'light dark',
        },
        {
          name: 'theme-color',
          content: '#ff7300',
        },
        {
          httpEquiv: 'x-ua-compatible',
          content: 'IE=edge',
        },
      ]}
      additionalLinkTags={[]}
    />
  );
};
