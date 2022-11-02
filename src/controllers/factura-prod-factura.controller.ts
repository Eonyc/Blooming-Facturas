import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Factura,
  ProdFactura,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaProdFacturaController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/prod-facturas', {
    responses: {
      '200': {
        description: 'Array of Factura has many ProdFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProdFactura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProdFactura>,
  ): Promise<ProdFactura[]> {
    return this.facturaRepository.prodFacturas(id).find(filter);
  }

  @post('/facturas/{id}/prod-facturas', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProdFactura)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProdFactura, {
            title: 'NewProdFacturaInFactura',
            exclude: ['id'],
            optional: ['id_factura']
          }),
        },
      },
    }) prodFactura: Omit<ProdFactura, 'id'>,
  ): Promise<ProdFactura> {
    return this.facturaRepository.prodFacturas(id).create(prodFactura);
  }

  @patch('/facturas/{id}/prod-facturas', {
    responses: {
      '200': {
        description: 'Factura.ProdFactura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProdFactura, {partial: true}),
        },
      },
    })
    prodFactura: Partial<ProdFactura>,
    @param.query.object('where', getWhereSchemaFor(ProdFactura)) where?: Where<ProdFactura>,
  ): Promise<Count> {
    return this.facturaRepository.prodFacturas(id).patch(prodFactura, where);
  }

  @del('/facturas/{id}/prod-facturas', {
    responses: {
      '200': {
        description: 'Factura.ProdFactura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProdFactura)) where?: Where<ProdFactura>,
  ): Promise<Count> {
    return this.facturaRepository.prodFacturas(id).delete(where);
  }
}
