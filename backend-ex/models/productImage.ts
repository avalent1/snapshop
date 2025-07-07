import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Product } from './product';

interface ProductImageAttributes {
  id: number;
  url: string;
  publicId: string;
  productId: number;
}
interface ProductImageCreationAttributes extends Optional<ProductImageAttributes, 'id'> {}

export class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> implements ProductImageAttributes {
  public id!: number;
  public url!: string;
  public publicId!: string;
  public productId!: number;

  public product?: Product;
}

ProductImage.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    url: { type: DataTypes.STRING, allowNull: false },
    publicId: { type: DataTypes.STRING,allowNull: false },
    productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  },
  { sequelize, tableName: 'product_images' }
);

export function associateProductImageModels() {
  ProductImage.belongsTo(Product, { foreignKey: 'productId' });
}