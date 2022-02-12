import PostContent from "../../components/posts/post-detail/post-content"
import { getPostData, getPostsFiles } from "../../lib/posts-util"
import Head from "next/head"
import { Fragment } from "react"

const PostDetailsPage = (props) => {
    return <Fragment>
        <Head>
            <title>{props.post.title}</title>
            <meta name="description" content={props.post.excerpt} />
        </Head>
        <PostContent post={props.post} />
    </Fragment>
}

export default PostDetailsPage

export const getStaticProps = (context) => {
    const { params } = context
    const postData = getPostData(params.slug)
    return {
        props: {
            post: postData
        },
        revalidate: 600
    }
}
export const getStaticPaths = () => {
    const postsFiles = getPostsFiles()
    const postSlugs = postsFiles.map(filename => filename.replace(/\.md$/, ''))

    return {
        paths: postSlugs.map(slug => ({ params: { slug } })),
        fallback: false
    }
}

