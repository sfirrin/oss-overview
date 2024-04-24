

export default function Page () {
    const productCount = (undefined as any).products.length;

    return (
        <main className="mt-3">
            HEllo World {productCount}
        </main>
    )
}