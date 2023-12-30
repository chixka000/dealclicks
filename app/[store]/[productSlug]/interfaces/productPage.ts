export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  imageUrl: string;
}

export interface ProductPageParamProps {
  store: string;
  productSlug: string;
}
export interface ProductPageLoaderParamProps {
  params: ProductPageParamProps;
}

export interface ProductsPageProps {
  products: Product[];
  params: ProductPageParamProps;
}
