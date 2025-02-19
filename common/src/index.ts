

import z from "zod";


export const signUpInput=z.object({
    email:z.string().email(),
    password:z.string(),
    name:z.string().optional()
})

//type inference in zod
export type SignUpInput=z.infer<typeof signUpInput>

export const signInInput=z.object({
    email:z.string().email(),
    password:z.string()
})

export type SignInInput=z.infer<typeof signInInput>

export const blogInput=z.object({
    title:z.string(),
    content:z.string()
})

export type BlogInput=z.infer<typeof blogInput>


export const updateblogInput=z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})

export type UpdateBlogInput=z.infer<typeof updateblogInput>