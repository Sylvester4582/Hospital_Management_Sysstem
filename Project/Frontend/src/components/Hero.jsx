import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
    <div className='hero container'>
      <div className="banner">
      <h1>{title}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui porro eius deleniti reprehenderit debitis earum tempore odit, inventore, saepe eveniet soluta delectus, a hic. Molestiae deleniti quidem, sit voluptatem, facilis impedit repellendus quaerat recusandae animi dolorem corporis dolorum porro provident officiis similique, eveniet est non veritatis nemo magnam possimus ad!</p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className='animated-image' />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  )
}

export default Hero
