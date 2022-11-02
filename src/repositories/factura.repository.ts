import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Factura, FacturaRelations, ProdFactura} from '../models';
import {ProdFacturaRepository} from './prod-factura.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly prodFacturas: HasManyRepositoryFactory<ProdFactura, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ProdFacturaRepository') protected prodFacturaRepositoryGetter: Getter<ProdFacturaRepository>,
  ) {
    super(Factura, dataSource);
    this.prodFacturas = this.createHasManyRepositoryFactoryFor('prodFacturas', prodFacturaRepositoryGetter,);
    this.registerInclusionResolver('prodFacturas', this.prodFacturas.inclusionResolver);
  }
}
