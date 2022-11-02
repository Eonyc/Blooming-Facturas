import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProdFactura,
  Factura,
} from '../models';
import {ProdFacturaRepository} from '../repositories';

export class ProdFacturaFacturaController {
  constructor(
    @repository(ProdFacturaRepository)
    public prodFacturaRepository: ProdFacturaRepository,
  ) { }

  @get('/prod-facturas/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to ProdFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.number('id') id: typeof ProdFactura.prototype.id,
  ): Promise<Factura> {
    return this.prodFacturaRepository.Pertenece_a(id);
  }
}
