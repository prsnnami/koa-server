export const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return 'Hello world!';
    },
    me: (root, args, context) => {
      console.log(context)
      return context;
    }
  },
  Viewer: {
    __resolveType(obj, context, info){
      if(obj.id){
        return 'User';
      }
      return 'Public';
    },
  }
};
