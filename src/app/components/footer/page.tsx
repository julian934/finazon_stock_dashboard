import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Github from '../../images/icons8-github-90.png'
import Instagram from '../../images/icons8-instagram-100.png'
import LinkedIn from '../../images/icons8-linkedin-100.png'
import Twitter from '../../images/icons8-twitter-90.png'
type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='flex md:flex-row justify-around md:w-full' >
      
       <Link className='hover:bg-amber-400 rounded-md' href='/' ><Image className='h-12 w-12  ' src={Github} alt='Github' /></Link>
       <Link className='hover:bg-amber-400 rounded-md' href='/' ><Image className='h-12 w-12' src={Instagram} alt='Instagram' /></Link>
       <Link className='hover:bg-amber-400 rounded-md' href='/' ><Image className='h-12 w-12' src={LinkedIn} alt='LinkedIn' /></Link>
       <Link className='hover:bg-amber-400 rounded-md' href='/' ><Image className='h-12 w-12' src={Twitter} alt='Twitter' /></Link>
      </div>
  )
}

export default Footer