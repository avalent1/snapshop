import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { ProductImage } from './productImage';
import { ProductSize } from './productSize';

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  bestseller: boolean;
}
interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public category!: string;
  public subCategory!: string;
  public bestseller!: boolean;

  // associations
  public images?: ProductImage[];
  public sizes?: ProductSize[];
}

Product.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING, allowNull: true },
    subCategory: { type: DataTypes.STRING, allowNull: true },
    bestseller: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, 
    tableName: 'products',
    timestamps: true,}
);

Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
Product.hasMany(ProductSize, { foreignKey: 'productId', as: 'sizes' });