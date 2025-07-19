import sequelize from '../config/database';
import { DataTypes, Model, Optional  } from 'sequelize';

export interface ProductAttributes {
    _id: number;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    bestseller: boolean;
}

export interface ProductCreationAttributes
  extends Optional<ProductAttributes, '_id'> {}

export class Product
    extends Model<ProductAttributes>
  implements ProductAttributes
{
  public _id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public image!: string[];
  public category!: string;
  public subCategory!: string;
  public sizes!: string[];
  public bestseller!: boolean;

}

Product.init(
  {
    _id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name:           { type: DataTypes.STRING,  allowNull: false },
    description:    { type: DataTypes.TEXT,    allowNull: false },
    price:          { type: DataTypes.DECIMAL, allowNull: false },
    image:          { 
      // Sequelize doesn’t have an array-of-strings type for MySQL,
      // so you might store JSON:
      type: DataTypes.JSON, 
      allowNull: false 
    },
    category:       { type: DataTypes.STRING,  allowNull: false },
    subCategory:    { type: DataTypes.STRING,  allowNull: false },
    sizes:          { type: DataTypes.JSON,    allowNull: false },
    bestseller:     { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: 'products'
  }
);
