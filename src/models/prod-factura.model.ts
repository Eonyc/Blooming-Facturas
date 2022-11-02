import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Factura} from './factura.model';

@model()
export class ProdFactura extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  PrecioUni: number;

  @property({
    type: 'number',
    required: true,
  })
  id_producto: number;

  @belongsTo(() => Factura, {name: 'Pertenece_a'})
  id_factura: number;

  constructor(data?: Partial<ProdFactura>) {
    super(data);
  }
}

export interface ProdFacturaRelations {
  // describe navigational properties here
}

export type ProdFacturaWithRelations = ProdFactura & ProdFacturaRelations;
