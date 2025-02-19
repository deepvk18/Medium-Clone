import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { blogInput, updateblogInput } from "@deepvk18/medium-common";



export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }

}>();


blogRouter.use('/*', async (c, next) => {
    //get the header
    //verify the header
    //if the header is correct we can proceed
    //if its wrong then return 403 status code
    //get the user id
    //pass it down to the route handler

    const authHeader = c.req.header('Authorization') || "";



    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {

        c.set("userId", String(user.id))
        await next()

    }
    else {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

})


blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = blogInput.safeParse(body);
    console.log(success);
    if (!success) {
        c.status(404);
        return c.json({
            message: "wrong inputs"
        })
    }
    const authorId = c.get("userId");
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })
    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = updateblogInput.safeParse(body);
    console.log(success);
    if (!success) {
        c.status(404);
        return c.json({
            message: "wrong inputs"
        })
    }
    await prisma.post.update({
        where: {
            id: body.id,

        }, data: {
            title: body.title,
            content: body.content
        }
    })

    return c.text('updated post')
})



blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({});
    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.findUnique({
        where: {
            id: id
        }
    })

    return c.json({
        blog
    })
})

