import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Product } from './Product';

interface ProductSizeAttributes {
  id: number;
  productId: number;
  size: string;
}
interface ProductSizeCreationAttributes extends Optional<ProductSizeAttributes, 'id'> {}

export class ProductSize extends Model<ProductSizeAttributes, ProductSizeCreationAttributes> implements ProductSizeAttributes {
  public id!: number;
  public productId!: number;
  public size!: string;

  public product?: Product;
}

ProductSize.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    size: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: 'product_sizes' }
);

export function associateProductSizeModels() {
  ProductSize.belongsTo(Product, { foreignKey: 'productId' });
}