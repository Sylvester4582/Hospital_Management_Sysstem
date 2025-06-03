import React from 'react'
import Hero from '../components/Hero.jsx'
import Biography from '../components/Biography.jsx'
import Department from '../components/Department.jsx'
import MessageForm from '../components/MessageForm.jsx'

const Home = () => {
  return (
    <>
      <Hero title={"Welcome to SilverCare Medicare Institute | Your Trusted Healthcare"} imageUrl="/hero.png" />
      <Biography imageUrl={"/public/about.png"} />
      <Department />
      <MessageForm />
    </>
  )
}

export default Home
