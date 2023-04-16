import Head from 'next/head';

export default function Metatags({
  author = 'Tan Voon Tao 101234693',
  title = 'Assessment 2 IoT individual Project',
  description = 'Super hard project',
  image = 'https://media.licdn.com/dms/image/C5603AQGIJtgXZ0iouA/profile-displayphoto-shrink_800_800/0/1639817455024?e=2147483647&v=beta&t=FXJWYCakuwLVmZh5cKJobe2tAVXOoN9m0orlto5HBnUhttps://arxmedia.co/wp-content/uploads/2021/05/arx-logo-2-10.png',
  keywords = 'IoT, Swinburne',
}) {
  return (
    <Head>
      <title>{title}</title>

      {/* <meta charset="UTF-8" /> */}

      <meta name="keyword" content={keywords} />
      <meta name="author" content={author} />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

    </Head>
  );
}
