import type { Product } from './Product';
import { Bundle } from './Bundle';

export class BundleWithProducts extends Bundle {
  public products: Product[];

  constructor(props: {
    id: string;
    name: string;
    resalePrice: number;
    products: Product[];
  }) {
    const productIds = props.products.map(p => p.id);
    super({ id: props.id, name: props.name, resalePrice: props.resalePrice, productIds });
    this.products = props.products;
  }

  calculateCost(): number {
    return this.products.reduce((sum, p) => sum + p.price * p.qty, 0);
  }

  calculateProfit(): number {
    return this.resalePrice - this.calculateCost();
  }
}
