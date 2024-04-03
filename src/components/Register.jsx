
import { CircleUser } from "lucide-react"
import { Link } from "react-router-dom";
import image from "/src/assets/blue-brush-stroke-banner-design.jpg";
import { useState } from 'react';
//import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp. Vui lòng thử lại.');
            return;
        }

        const user = {
            email,
            password,
        };

        localStorage.setItem('user', JSON.stringify(user));

        setEmail('');
        setPassword('');
        setConfirmPassword('');

        setMessage('Đăng ký thành công!');

        // if (password !== confirmPassword) {
        //     alert('Mật khẩu không khớp. Vui lòng thử lại.');
        //     return;
        // }
        
        // const user = {
        //     email,
        //     password,
        // };
        
        // Gọi API để đăng ký
        // axios.post('https://apikde.vercel.app/api/register', user)
        // .then(response => {
        //     const data = response.data;
        //     if (data.success) {
        //         // Lưu thông tin người dùng vào localStorage
        //         localStorage.setItem('user', JSON.stringify(user));
        
        //         setEmail('');
        //         setPassword('');
        //         setConfirmPassword('');
        
        //         setMessage('Đăng ký thành công!');
        //     } else {
        //         // Xử lý lỗi từ server
        //         setMessage(data.message);
        //     }
        // })
        // .catch((error) => {
        //     // Xử lý lỗi mạng
        //     console.error('Error:', error);
        // });        
    };
    console.log("Register rendering")
    return (
        <div className="w-full h-screen flex flex-col md:flex-row items-start">
            <div className="relative w-full md:w-1/2 h-half md:h-full flex flex-col">
                <div className="absolute top-[20%] left-[10%] flex flex-col"></div>
                <img
                src={image}
                alt=""
                className="w-full h-full object-cover shadow-2xl"
                />
            </div>
            <div className="w-full md:w-1/2 h-half md:h-full bg-[#f5f5f5] flex flex-col p-4 md:p-20 justify-between">
                <div className="w-full flex flex-col max-w-[500px]">
                <div className="w-full flex flex-col mb-2">
                    <h3 className="text-4xl font-semibold mb-2">Register</h3>
                    <p className="text-sm mb-2">
                    Welcome Back! Please enter your details
                    </p>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col">
                    <div className="relative my-4">
                        <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                        />
                        <CircleUser className="absolute top-7 right-4" />
                    </div>
                    <div className="relative my-4">
                        <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                        />
                    </div>
                    <div className="relative my-4">
                        <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                        />
                    </div>
                    </div>
                    <div className="w-full flex flex-col my-4">
                    <button
                        type="submit"
                        className="w-full h-12 text-white my-2 bg-[#013CC6] border-2 border-white rounded-full p-1 text-center flex items-center justify-center hover:bg-white hover:text-[#013CC6] transition-all hover:border-2 hover:border-[#013CC6]"
                    >
                        Register
                    </button>
                    </div>
                    {message && (
                    <div className="message">
                        {message} Chuyển tới trang{" "}
                        <span className="font-semibold underline underline-offset-2 cursor-pointer">
                        <Link to={"/login"}>Đăng nhập</Link>
                        </span>
                    </div>
                    )}
                </form>
                </div>
                <div className="w-full flex items-center justify-center">
                <p className="text-sm font-normal text-[#060606]">
                    You have an account?{" "}
                    <span className="font-semibold underline underline-offset-2 cursor-pointer">
                    <Link to={"/login"}>Login</Link>
                    </span>
                </p>
                </div>
            </div>
        </div>
    )
}
export default Register