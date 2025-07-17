import { client } from "db/client";

export default async function getServerSideProps(){
  const users = await client.user.findMany();

  return(
    <div>{
      users.map(user => (
        <div key={user.id}>
           <div>{user.username}</div>
          <div>{user.password}</div>
        </div>
      ))}</div>
  ) 
}

export const dynamic = "force-dynamic" // ( Forcing a page to be dynamic )

// export const revalidate = 60 // ( Generate it statically but keep revalidating it every 60s - INCREMENTAL SITE GENERATION )