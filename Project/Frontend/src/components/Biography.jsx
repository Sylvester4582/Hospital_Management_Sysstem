import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta vel, aliquam quaerat distinctio illum exercitationem, error voluptates incidunt reprehenderit facilis neque nostrum deserunt accusamus tempore possimus, totam quia omnis atque modi laudantium. Vel possimus corrupti est maiores! Pariatur consequatur minus dolores, sit similique voluptatum earum iusto a sint dolor repellendus.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, mollitia. Culpa odio adipisci quia tenetur aut in harum recusandae perferendis eligendi corrupti. Quia inventore quasi accusantium blanditiis nesciunt, similique ut beatae optio sit nulla quos.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse eligendi voluptate cupiditate!</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  )
}

export default Biography
