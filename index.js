const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const { db } = require('./config')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const Post = require('./models/Post')

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req })
})

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true
			// useCreateIndex: true,
			// useFindAndModify: false
		})
		console.log('mongo connected')
	} catch (err) {
		console.error(err.message)
		process.exit(1)
	}
}

connectDB()

server.listen({ port: 4000 }).then(res => {
	console.log(`server running at ${res.url}`)
})
