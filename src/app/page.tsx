import Image from "next/image";
import styles from './page.module.css'
import Link from "next/link";
import logger from "@/logger";
import { prisma } from "../../prisma/prisma";

async function getAllPosts(page: number, searchTerm: string) {
    

    const perPage = 6
    const skip = (page - 1) * page
    const prev = page > 1 ? page - 1 : null
    const totalPosts = await prisma.post.count()
    const totalPages = Math.ceil(totalPosts / perPage)
    const next = page < totalPages ? page + 1 : null


    try {
        const posts = await prisma.post.findMany({
            where: {
                title: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            },
            include: {
                author: true
            },
            take: perPage,
            skip,
            orderBy: { createdAt: 'desc' }
        })

        
        if(posts.length === 0) throw new Error("Erro ao consumir APi")
    
        logger.info("Dados vindo do Banco de dados")
    
        return {
            posts,
            prev,
            next
        }
    } catch (error) {
        logger.error("Erro ao consumir API")
        return []
    }
}

export default async function Home({ searchParams }: any) {

  const pages = Number(searchParams?.page) || 1
  const search = searchParams.search 
  const { posts, prev, next } = await getAllPosts(pages, search)

  return (
    <section>
     <main>
            <form action="#" method="get">
                <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    placeholder="Digite o que você procura" 
                    className={styles.input}
                />
            </form>

            <section className={styles["container-cards"]}>
                { posts.map((post: any) => {
                    return (
                        <div className={styles.cards} key={post.id}>
                            <Image src={post.cover} alt={post.title} width={486} height={181} priority/>

                            <div className={styles["cards-content"]}>
                                <h2 className={styles["cards-title"]}>{post.title}</h2>
                                <p className={styles["cards-description"]}>{post.body}</p>
                                <a href={`/posts/${post.slug}`} className={styles["cards-link"]}>Ver detalhes</a>
                            </div>
                        </div>
                    )
                }) }

        <div>
            {prev && <Link href={{ pathname: '/', query: { page: prev, search } }}  >Página anterior</Link>}
            {next && <Link href={{ pathname: '/', query: { page: next, search }  }}> Próxima página</Link>}
        </div>
            </section>
        </main>
    </section>
  );
}
