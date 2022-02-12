import classes from './post-content.module.css'
import PostHeader from './post-header'
import Markdown from 'markdown-to-jsx';
import Image from "next/image"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'

SyntaxHighlighter.registerLanguage('js', js)

const PostContent = (props) => {
    const imagePath = `/images/posts/${props.post.slug}/${props.post.image}`

    return (
        <article className={classes.content}>
            <PostHeader
                title={props.post.title}
                image={imagePath}
            />
            <Markdown options={{
                overrides: {
                    code: {
                        component: SyntaxHighlighter,
                        props: {
                            language: 'javascript',
                            style: atomOneDark
                        }
                    },
                    img: {
                        component: Image,
                        props: {
                            width: 600,
                            height: 300
                        }
                    }
                }
            }}>
                {props.post.content}
            </Markdown>
        </article>
    )
}

export default PostContent