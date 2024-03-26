/* eslint-disable react/prop-types */

import { CircleUser, Lock } from "lucide-react"
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = ({onSuccessfulLogin}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // useEffect(() => {
    //     // Kiểm tra trạng thái đăng nhập sau khi tải lại trang
    //     const isLoggedIn = localStorage.getItem('isLoggedIn');
    //     if (isLoggedIn === 'true') {
    //       // Đăng nhập thành công
    //         onSuccessfulLogin();
    //     }
    // }, [onSuccessfulLogin]);

    const handleLogin = (e) => {
        e.preventDefault();
    
        // Kiểm tra logic đăng nhập
        if (username === 'admin@gmail.com' && password === '1') {
            
          // Đăng nhập thành công
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            onSuccessfulLogin();
        } else {
          // Đăng nhập thất bại
            setErrorMessage('Tên người dùng hoặc mật khẩu không chính xác.');
        }
    };
    return (
        <div className="login-container flex justify-center items-center min-h-screen w-screen">
            <div className="wrapper bg-slate-800 border rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <div>
                    <h1 className="text-4xl text-[#013CC6] font-bold text-center mb-6 ">Login</h1>
                    <form action="" onSubmit={handleLogin}>
                        <div className="relative my-4">
                            <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-[#013CC6] focus:outline-none focus:ring-0 focus:text-white focus:border-[#013CC6] focus peer" required placeholder=""/>
                            <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#013CC6] peer-focus:dark:text-[#013CC6] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Your email</label>
                            <CircleUser className="absolute top-4 right-4 p-1"/>
                        </div>

                        <div className="relative my-4">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-[#013CC6] focus:outline-none focus:ring-0 focus:text-white focus:border-[#013CC6] focus peer" required placeholder=""/>
                            <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#013CC6] peer-focus:dark:text-[#013CC6] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Your password</label>
                            <Lock className="absolute top-4 right-4 p-1"/>
                        </div>
                        
                        <button type="submit" className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-[#013CC6] hover:bg-[#013CC6] hover:text-white py-2 transition-colors duration-300">Login</button>
                        <div>
                            <span className="m-4">New Here? <Link className="text-[#013CC6]" to={'/register'} >Create an Account</Link> </span>
                            {errorMessage && <p className="text-[#be2f2f] text-sm m-4">{errorMessage}</p>}
                            <p className="text-green-800">user: admin@gmail.com - pass: 1</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage