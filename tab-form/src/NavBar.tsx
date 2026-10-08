
const tabs = ["Profile","Interest","Settings"]

function Navbar() {
    return (
        <div className="flex gap-5">
            {tabs.map((t) => (
                <div>
                    {t}
                </div>
            ))}
        </div>
    )
}

export default Navbar