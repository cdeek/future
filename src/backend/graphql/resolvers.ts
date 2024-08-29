import { User, Global, Product, Page, Media, Review } from '../models';
import jwt from 'jsonwebtoken';

const verifyFromToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET) as { userId: string };
    return decoded.userId;
  } catch (e) {
    return null;
  }
};

const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo Server!',
    
    users: async () => {
      return await User.find({});
    },

    user: async (_, args) => {
      const _id = await verifyFromToken(args.token);
      return User.find({ _id });
    },
    
    header: async () => {
      return Global.find({});
    },

    footer: async () => {
      return Global.find({});
    },

    pages: async (_, args) => {
      const skip = (args.load - 1) * args.limit;
      return Page.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(args.limit);
    },

    page: async (_, args) => {
      return Page.findOne({ slug: args.slug });
    },

    products: async (_, args) => {
      const skip = (args.load - 1) * args.limit;
      if (args.token) {
        const _id = verifyFromToken(args.token);
        return Product.find({ sellerId: _id })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(args.limit);
      } else {
        return Product.find({})
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(args.limit);
      }
    },

    product: async (_, args) => {
      return Product.findOne({ _id: args._id });
    },

    medias: async () => {
      return Media.find({});
    },

    reviews: async () => {
      return Review.find({});
    }
  },

  Product: {
    reviews: async (parent) => {
      return Review.find({ productId: parent._id });
    },
    medias: async (parent) => {
      return Media.find({ productId: parent._id });
    }
  },

  Mutation: {
    addProduct: async (_, args) => {
      const product = new Product({
        ...args.product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      await product.save();
      return product;
    },

    deleteProduct: async (_, args) => {
      const product = await Product.findByIdAndDelete(args.id);
      return product;
    },

    updateProduct: async (_, args) => {
      const product = await Product.findByIdAndUpdate(args.id, {
        ...args.product,
        updatedAt: new Date().toISOString()
      }, { new: true });
      return product;
    }
  }
};

export default resolvers;
