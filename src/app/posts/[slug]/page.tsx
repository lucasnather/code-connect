import logger from "@/logger"
import { prisma } from "../../../../prisma/prisma"
import { redirect } from "next/navigation"
import Image from "next/image"
import { remark } from 'remark';
import html from 'remark-html';
import styles from './page.module.css'

async function getPostsBySlug (slug: string)  {

    try {
        const post = await prisma.post.findFirst({
            where: {
                slug
            },
            include: {
                author: true
            }
        })

        if(!post) throw new Error("Slug Não Encontrado")

        const processedContent = await remark()
        .use(html)
        .process(post.markdown);

        const contentHtml = processedContent.toString();

        post.markdown = contentHtml


        return post
    } catch (error) {
        logger.error("Erro no Banco de Dados ao ir pegar um slug")
        redirect('/not-found')
    }

}

const PostsSlug = async ({ params }) => {
    const slug = params.slug

    const post = await getPostsBySlug(slug)

    return (
        <section>
            <div className={styles.container}>
                <div>
                    <Image src={post.cover} alt="Imagem " width={961} height={300} />
                </div>

                <div>
                    <h2>{post.title}</h2>

                    <p>{post.body}</p>

                    <p>{post.author.username}</p>
                </div>
            </div>

            <div className={styles.container}>
                <h2>Código: </h2>

                <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
            </div>
        </section>
    )
}

export default PostsSlug