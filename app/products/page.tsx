import { cookies } from 'next/headers'


export default function Page () {

    const cookieStore = cookies();
    console.log("Hello")
    const productCount = (undefined as any).products.length;

    return (
        <main className="mt-3">
            HEllo World {productCount} {cookieStore.get('auth_token')}
        </main>
    )
}