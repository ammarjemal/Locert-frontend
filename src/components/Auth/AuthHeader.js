import logo from "../../assets/logo.svg"
export default function Header({
    heading,
}){
    return(
        <div className="mb-5">
            <div className="flex justify-center">
                <img 
                    alt="Project Logo"
                    className="w-30 mb-5"
                    src={logo}
                />
            </div>
            <h2 className="mt-2 text-center text-2xl font-bold">
                {heading}
            </h2>
        </div>
    )
}