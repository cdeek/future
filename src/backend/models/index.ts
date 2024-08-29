import mongoose, { Schema } from 'mongoose';

const mediaSchema = new Schema({
  alt: String,
  caption: [String],
  url: { type: String, required: true },
  filename: String,
  mimeType: String,
  filesize: Number,
  width: Number,
  height: Number,
  refId:  { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Media = mongoose.model('Media', mediaSchema);

const UserSchema = new Schema<any>({
  name: { type: String, default: null },
  email: { type: String, required: true, unique: true },
  roles: { type: [String], enum: ['admin', 'customer', 'seller'], default: null },
  purchases: { type: [Schema.Types.Mixed], default: null },
  cart: {
    items: { type: Schema.Types.Mixed, default: null }
  },
  resetPasswordToken: { type: String, default: null },
  salt: { type: String, default: null },
  hash: { type: String, default: null },
  loginAttempts: { type: Number, default: null },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<any>('User', UserSchema);


const PageSchema = new mongoose.Schema<any>({
  title: { type: String, required: true },
  publishedOn: { type: Date, default: Date.now },
  hero: {
    type: { type: String, enum: ['none', 'highImpact', 'mediumImpact', 'lowImpact'], default: 'none' },
    richText: [{ type: Map, of: String }],
    links: [{
      link: {
        type: { type: String, enum: ['reference', 'custom'], default: 'custom' },
        newTab: { type: Boolean, default: false },
        reference: {
          relationTo: { type: String, enum: ['pages'] },
          value: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
        },
        url: String,
        label: String,
        appearance: { type: String, enum: ['default', 'primary', 'secondary'], default: 'default' },
      },
    }],
    media: String,
  },
  layout: [{
    blockType: { type: String, enum: ['cta', 'content', 'mediaBlock', 'archive'], required: true },
    invertBackground: Boolean,
  }],
  slug: { type: String, unique: true, required: true },
  meta: {
    title: String,
    description: String,
    image: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  _status: { type: String, enum: ['draft', 'published'], default: 'draft' },
});

export const Page = mongoose.model<any>('Page', PageSchema);

const ProductSchema = new Schema<any>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  publishedOn: { type: String, default: null },
  stripeProductID: { type: String, default: null },
  priceJSON: { type: String, default: null },
  categories: {
    type: [{
      type: Schema.Types.Mixed,
      ref: 'Category'
    }],
    default: null
  },
  relatedProducts: {
    type: [{
      type: Schema.Types.Mixed,
      ref: 'Product'
    }],
    default: null
  },
  skipSync: { type: Boolean, default: null },
  meta: {
    title: { type: String, default: null },
    description: { type: String, default: null },
    image: {
      type: Schema.Types.Mixed,
      ref: 'Media',
      default: null
    },
    keywords: { type: [String], default: null }
  },
  sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedAt: { type: String, required: true },
  createdAt: { type: String, required: true },
  _status: { type: String, enum: ['draft', 'published'], default: null }
});

export const Product = mongoose.model<any>('Product', ProductSchema);

const navLinkSchema = new Schema({
  title: String,
  url: String,
});

const headerSchema = new Schema({
  navLinks: [navLinkSchema],
});

const footerSchema = new Schema({
  navLinks: [navLinkSchema],
});

const GlobalSchema = new Schema({
  header: {
    type: headerSchema,
  },
  footer: {
    type: footerSchema,
  },
});

export const Global = mongoose.model<any>('Global', GlobalSchema);

const reviewSchema = new Schema({
  rating: { type: Number, required: true },
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Review = mongoose.model('Review', reviewSchema);

