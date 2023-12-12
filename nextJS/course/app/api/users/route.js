//http://localhost:3000/api/users
export async function GET (request){
    const users = [
        {
            id:1,name : "Jhon" 
        },
        {
         id : 2 , name : "Jane"
        },
        {
            id:3,name:"Alex"
        }

    ]
    return new Response(JSON.stringify(users))


}