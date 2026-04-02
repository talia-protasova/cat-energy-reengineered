export interface ProductImage {
  base: string;
  alt: string;
}

export interface Product {
  id: string;
  title: string;
  weight: string;
  taste: string;
  price: number;
  image: ProductImage;
  size: 'small' | 'big';
}
