import type { GetStaticPaths, GetStaticProps } from "next"
import { PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()

export type UsersPageProps =User;

export default function UserPage({email, id, name} : UsersPageProps) {
  return (
      <div>
        Name {name} <br/>
        Id {id} <br/>
        Email {email} <br/>
      </div> 
  )
}

type UserQuery = {
  id: string
}

export const getStaticPaths:GetStaticPaths<UserQuery> = async () => { 
  const usersIds = await prisma.user.findMany({
    select: {
      id: true,
    }
  })
  return {
    paths: usersIds.map((user) => ({
      params: {id: user.id.toString()}
    })),
    fallback: false,
   }
}

export const getStaticProps:GetStaticProps<UsersPageProps, UserQuery> = async ({params}) => { 
  const user = await prisma.user.findFirst({
    where: {
      id: Number(params?.id)
    }
  })as User;
  return {
    props: user,
  }
}