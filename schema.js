const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// Title Holders
const TitleHolders = new GraphQLObjectType({
  name: "Fighters",
  fields: () => ({
    id: { type: GraphQLInt },
    nickname: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    weight_class: { type: GraphQLString },
    wins: { type: GraphQLInt },
    title_holder: { type: GraphQLBoolean }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    title_holders: {
      type: new GraphQLList(TitleHolders),
      resolve(parent, args) {
        return axios
          .get("http://ufc-data-api.ufc.com/api/v3/us/fighters/title_holders")
          .then(res => res.data);
      }
    },
  
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
