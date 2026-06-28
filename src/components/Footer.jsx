import { CiLinkedin } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { TbBrandLeetcode } from "react-icons/tb";
export default function Footer(){
    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center p-2 md:pb-12 md:px-8">
    
                <p className="text-center md:text-left order-2 md:order-1">
                    © 2026 Anobhav Singh
                </p>

                <div className="flex justify-center gap-6 order-1 p-2 md:order-2">
                    <a href="https://www.linkedin.com/in/anobhav-singh-a97ba8271/" target="_blank" rel="noreferrer">
                        <CiLinkedin />
                    </a>
                    <a href="https://github.com/Anobhav" target="_blank" rel="noreferrer">
                        <FiGithub />
                    </a>
                    <a href="https://leetcode.com/u/Anobhav/" target="_blank" rel="noreferrer">
                        <TbBrandLeetcode />
                    </a>
                </div>

                <p className="text-center md:text-right order-3">
                    singhanobhav@gmail.com
                </p>

            </div>
        </>
    )
};