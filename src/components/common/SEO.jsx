import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description }) => {
  const fullTitle = `dabuma`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Schema.org Person */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Sergio David Burbano Mariño",
          "jobTitle": "Ingeniero de Sistemas",
          "url": "https://dabuma.com",
          "sameAs": [
            "https://github.com/personalbuse",
            "https://www.linkedin.com/in/sergio-david-burbano-mari%C3%B1o-31576a200/"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
