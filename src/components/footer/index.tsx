import {AiOutlineGithub} from "react-icons/ai";
import {FaFacebookF} from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="flex flex-col items-center bg-footerBg text-slate-300 gap-4 pt-6 pb-5">
			<div className="flex gap-x-1 text-4xl text-white">
				<a
					href="https://www.facebook.com/kelkfia/"
					target="_blank"
					className="footer__icon__item"
					rel="noreferrer"
				>
					<FaFacebookF />
				</a>
				<a
					href="https://github.com/Kelkifa"
					target="_blank"
					className="footer__icon__item"
					rel="noreferrer"
				>
					<AiOutlineGithub />
				</a>
			</div>
			{/* <FaGoogle /> */}
			<address className="footer__contact">
				<div className="text-slate-400">Contact and feedback</div>
				<div className="footer__contact__email">plhuan455@gmail.com</div>
			</address>
			<div className="text-[0.6rem] text-slate-300/50">
				Background Photo by Polina Kovaleva from Pexels
			</div>
		</footer>
	);
}
