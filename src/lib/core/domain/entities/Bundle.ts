import { nanoid } from 'nanoid';

export class Bundle {
  public readonly id: string;
  public name: string;
  public resalePrice: number;
  public productIds: string[];

  constructor({
    id = nanoid(),
    name,
    resalePrice,
    productIds = []
  }: {
    id: string;
    name: string;
    resalePrice: number;
    productIds: string[];
  }) {
    if (resalePrice < 0) throw new Error('Resale price must be non-negative');
    this.id = id;
    this.name = name;
    this.resalePrice = resalePrice;
    this.productIds = productIds;
  }

  addProduct(productId: string) {
    if (!this.productIds.includes(productId)) {
      this.productIds.push(productId);
    }
  }

  removeProduct(productId: string) {
    this.productIds = this.productIds.filter(id => id !== productId);
  }

  updatePrice(newPrice: number) {
    if (newPrice < 0) throw new Error('Price must be non-negative');
    this.resalePrice = newPrice;
  }
}
