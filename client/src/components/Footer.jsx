import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";
import { footerLinks } from "../utils/data";
import CustomButton from "./CustomButton";
import { useState } from 'react';
import TextInput from "./TextInput";

const Footer = () => {

  const [userEmail, setUserEmail] = useState('');
  const handleYoutubeClick = async () => {
    // Kullanıcı giriş yapmış mı kontrol et
    // Bu adımda, kullanıcının giriş yapmış olup olmadığını kontrol eden bir kod bulunmalıdır.
       
    // Kullanıcının e-posta adresini doğrula
    if (userEmail.trim() === '') {
      console.log('Please enter an email address.');
      return;
    }

    // Belirtilen miktarı kullanıcının hesabına yatır
    const depositAmount = 100; // Örnek olarak belirtilen miktar
    console.log(`Deposit $${depositAmount} to user's account.`);
  };

  return (
    <footer className='text-white mp-20'>
      <div className='overflow-x-hidden -mb-0.5'>
        <svg
          preserveAspectRatio='none'
          viewBox='0 0 1200 120'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            fill: "#1d4ed8",
            width: "125%",
            height: 112,
            transform: "rotate(180deg)",
          }}
        >
          <path d='M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z' />
        </svg>
      </div>

      <div className='bg-[#1d4ed8] '>
        <div className='container px-5 py-20 mx-auto '>
          <div className='w-full flex flex-wrap gap-10 justify-between -mb-10 -px-4'>
            {footerLinks.map(({ id, title, links }) => (
              <div className='w-auto px-4 ' key={id + title}>
                <h2 className='font-medium text-white tracking-widest text-sm mb-3'>
                  {title}
                </h2>

                <div className='mb-10 flex flex-col gap-3 '>
                  {links.map((link, index) => (
                    <Link
                      key={link + index}
                      to='/'
                      className='text-gray-300 text-sm hover:text-white '
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className=''>
          <p className='container px-5 mx-auto text-white mt-2 '>
            Subscribe to our Newsletter
          </p>

          <div className='container mx-auto px-5 pt-6 pb-8 flex flex-wrap items-center justify-between '>
            <div className='w-full md:w-2/4 lg:w-1/3 h-16 flex items-center justify-center md:justify-start '>
              <TextInput
                styles='w-full flex-grow md:w-40 2xl:w-64 bg-gray-100 sm:mr-4 md-2'
                type='email'
                placeholder='Email Address'
                onChange={(e) => setUserEmail(e.target.value)}
              />

              <CustomButton
                title='Subscribe'
                containerStyles={
                  "block bg-[#001a36] text-white px-5 py-2.5 text-md rounded hover:bg-blue-800 focus:potline-none flex-col items-center mt-2"
                }
                onClick={handleYoutubeClick}
              />
            </div>

            <span className='inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto'>
            <a onClick={handleYoutubeClick} href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' className='text-white text-xl hover:scale-125 ease-in-out duration-300'>
              <FaFacebookF />
            </a>
            <a onClick={handleYoutubeClick} href='https://www.youtube.com/@yazlmclardunyas8265' target='_blank' rel='noopener noreferrer' className='text-white text-xl hover:scale-125 ease-in-out duration-300'>
              <FaYoutube />
            </a>
            <a   onClick={handleYoutubeClick} href='https://www.instagram.com' target='_blank' rel='noopener noreferrer' className='ml-3 text-white text-xl hover:scale-125 ease-in-out duration-300'>
              <FiInstagram />
            </a>
            <a  onClick={handleYoutubeClick}  href='https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAALhpvABlRTI6ECZyx6UokmaS_o0koLRKrE&keywords=emin%20boranda%C4%9F&origin=RICH_QUERY_SUGGESTION&position=0&searchId=e329cf3d-845c-4e49-ab03-2e0c667cadd0&sid=R0D&spellCorrectionEnabled=false' target='_blank' rel='noopener noreferrer' className='ml-3 text-white text-xl hover:scale-125 ease-in-out duration-300'>
              <FaLinkedinIn />
            </a>
          </span>
          </div>
        </div>

        <div className='bg-[#001a36]'>
          <div className='container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row'>
            <p className='text-gray-300 text-sm text-center sm:text-left'>
              &copy; 2023 Job Finder —
              <a
                href='https://youtube.com/@CodeWaveWithAsante'
                className='text-[#1199e7] ml-1'
                target='_blank'
                rel='noopener noreferrer'
              >
                @CodeWave
              </a>
            </p>

            <span className='sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-300 text-sm'>
              Designed by CodeWave
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;