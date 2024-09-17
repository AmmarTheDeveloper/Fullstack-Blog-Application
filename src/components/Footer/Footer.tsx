import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-7 border-t border-gray-200">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-gray-500 ">
              ©<Link href="/">ByteBlog</Link> 2024, All rights reserved.
            </span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
              <Link
                href="https://www.facebook.com/ammarthedeveloper"
                target="_blank"
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://x.com/AnsariAmmar01"
                target="_blank"
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-blue-400 dark:hover:bg-blue-500 hover:text-white transition-colors duration-300"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.instagram.com/ammarthedeveloper/"
                target="_blank"
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-pink-500 dark:hover:bg-pink-600 hover:text-white transition-colors duration-300"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/ammar-ansari-390ba1278/"
                target="_blank"
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 hover:text-white transition-colors duration-300"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/AmmarTheDeveloper"
                target="_blank"
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transition-colors duration-300"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
