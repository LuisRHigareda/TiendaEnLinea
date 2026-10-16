import { Color } from "../enums/colorEnum";
import { Talla } from "../enums/tallaEnum";

export interface VarianteProducto{
  id: string,
  talla: Talla,
  color: Color,
  stock: number;
}