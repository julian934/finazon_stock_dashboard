import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Github from '../../images/icons8-github-90.png'
import Instagram from '../../images/icons8-instagram-100.png'
import LinkedIn from '../../images/icons8-linkedin-100.png'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='flex md:flex-row justify-around md:w-full' >
      
       <Link className='hover:bg-amber-400 rounded-md' href='https://github.com/julian934/' ><Image className='h-12 w-12  ' src={Github} alt='Github' /></Link>
       <Link className='hover:bg-amber-400 rounded-md' href='https://www.instagram.com/jbthedev/' ><Image className='h-12 w-12' src={Instagram} alt='Instagram' /></Link>
       <Link className='hover:bg-amber-400 rounded-md' href='https://www.linkedin.com/in/julian-borner-709b91b7/' ><Image className='h-12 w-12' src={LinkedIn} alt='LinkedIn' /></Link>
       
      </div>
  )
}

export default Footer