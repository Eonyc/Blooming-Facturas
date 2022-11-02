import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProdFactura} from './prod-factura.model';

@model()
export class Factura extends Entity {
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
  Consecutivo: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  hora: number;

  @property({
    type: 'number',
    required: true,
  })
  id_cliente: number;

  @hasMany(() => ProdFactura, {keyTo: 'id_factura'})
  prodFacturas: ProdFactura[];

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
