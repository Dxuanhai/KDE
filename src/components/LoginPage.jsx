import { CircleUser, Lock } from "lucide-react"
import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <div className="login-container flex justify-center items-center min-h-screen w-screen">
            <div className="wrapper bg-slate-800 border rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <div>
                    <h1 className="text-4xl text-[#013CC6] font-bold text-center mb-6 ">Login</h1>
                    <form action="">
                        <div className="relative my-4">
                            <input type="email" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-[#013CC6] focus:outline-none focus:ring-0 focus:text-white focus:border-[#013CC6] focus peer" required placeholder=""/>
                            <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#013CC6] peer-focus:dark:text-[#013CC6] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Your email</label>
                            <CircleUser className="absolute top-4 right-4 p-1"/>
                        </div>

                        <div className="relative my-4">
                            <input type="password" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-[#013CC6] focus:outline-none focus:ring-0 focus:text-white focus:border-[#013CC6] focus peer" required placeholder=""/>
                            <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#013CC6] peer-focus:dark:text-[#013CC6] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Your password</label>
                            <Lock className="absolute top-4 right-4 p-1"/>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="Remember me">Remember Me</label>
                            </div>
                            <Link className="text-[#013CC6]" to={''}>Forgot Password?</Link>
                        </div>
                        <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-[#013CC6] hover:bg-[#013CC6] hover:text-white py-2 transition-colors duration-300" type="submit">Login</button>
                        <div>
                            <span className="m-4">New Here? <Link className="text-[#013CC6]" to={'/register'} >Create an Account</Link> </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage