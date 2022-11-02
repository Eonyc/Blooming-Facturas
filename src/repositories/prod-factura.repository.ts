import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {ProdFactura, ProdFacturaRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class ProdFacturaRepository extends DefaultCrudRepository<
  ProdFactura,
  typeof ProdFactura.prototype.id,
  ProdFacturaRelations
> {

  public readonly Pertenece_a: BelongsToAccessor<Factura, typeof ProdFactura.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(ProdFactura, dataSource);
    this.Pertenece_a = this.createBelongsToAccessorFor('Pertenece_a', facturaRepositoryGetter,);
    this.registerInclusionResolver('Pertenece_a', this.Pertenece_a.inclusionResolver);
  }
}
