import { TProducts } from "./product";



export type TOrderItem = {
    id: number;
    items: TProducts[];
    sutotal: number;
}