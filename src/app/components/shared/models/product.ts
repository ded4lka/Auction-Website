export interface IProduct {
  id: number;
  title: string;  
  description: string;
  imageUrl: string;
  endDate: Date;
  price: number;
  isBought: boolean;
  lastUser: string;
}