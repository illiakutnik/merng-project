import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/PostCard'

const Home = () => {
	const { loading, data } = useQuery(FETCH_POSTS_QUERY)
	const posts = data ? data.getPosts : null

	return (
		<div>
			<Grid columns={3}>
				<Grid.Row className='page-title'>
					<h1>Recent posts</h1>
				</Grid.Row>
				<Grid.Row>
					{loading ? (
						<h2>Loading posts...</h2>
					) : (
						posts &&
						posts.map(post => (
							<Grid.Column style={{ marginBottom: 20 }} key={post.id}>
								<PostCard post={post} />
							</Grid.Column>
						))
					)}
				</Grid.Row>
				<Grid.Row>
					<Grid.Column></Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	)
}

const FETCH_POSTS_QUERY = gql`
	{
		getPosts {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
			}
			commentCount
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`

export default Home
