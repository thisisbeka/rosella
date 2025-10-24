import { useEffect } from 'react';
import { Product } from '../lib/supabase';

interface ProductSchemaProps {
  products: Product[];
}

export default function ProductSchema({ products }: ProductSchemaProps) {
  useEffect(() => {
    const existingScript = document.getElementById('product-schema');
    if (existingScript) {
      existingScript.remove();
    }

    if (products.length === 0) return;

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": products.map((product, index) => {
        const images = product.image_urls && product.image_urls.length > 0
          ? product.image_urls
          : [product.image_url];

        const price = product.discount_percentage && product.discount_percentage > 0
          ? (product.price * (1 - product.discount_percentage / 100)).toFixed(2)
          : product.price.toFixed(2);

        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "name": product.name,
            "image": images,
            "description": product.description || `${product.name} - ROSELLA Çiçek Tasarımı`,
            "sku": product.id,
            "brand": {
              "@type": "Brand",
              "name": "ROSELLA"
            },
            "offers": {
              "@type": "Offer",
              "url": `https://inegolcicekci.com.tr/katalog`,
              "priceCurrency": "TRY",
              "price": price,
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "ROSELLA Çiçek Tasarımı"
              }
            },
            ...(product.discount_percentage && product.discount_percentage > 0 && {
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": product.price.toFixed(2),
                "priceCurrency": "TRY"
              }
            })
          }
        };
      })
    };

    const script = document.createElement('script');
    script.id = 'product-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(itemListSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('product-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [products]);

  return null;
}
