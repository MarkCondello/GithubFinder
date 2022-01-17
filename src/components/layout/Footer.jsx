import {FaHashtag} from 'react-icons/fa'

function Footer() {
  const footerYear = new Date().getFullYear()

  return (
    <footer className='p-10 bg-gray-700 text-primary-content footer-center'>
      <FaHashtag className='inline text-3xl mb-5'/>
      <p>Copyright &copy; {footerYear} All rights reserved</p>
    </footer>
  )
}

export default Footer
