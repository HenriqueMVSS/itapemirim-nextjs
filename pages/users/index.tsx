import { GetServerSideProps } from 'next'
import {  User } from '@prisma/client'
import { p } from '../../src/prismaClient'

export type UsersPageProps = {
  users: User[]

}

export default function UsersPage({users}: UsersPageProps){
  return <div>
      {users.map(({email, id, name}) => <div>
        Name {name} <br/>
        Id {id} <br/>
        Email {email} <br/>
      </div> )}
  </div>
}

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async()=> {
  const users = await p.user.findMany();
  return {
    props: {
      users,
    },
  }
}