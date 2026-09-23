import React from 'react'

const Hero = () => {
  return (
    <section style={style.section}>
        <div>
            <h1>AugShop</h1>
            <p>Shop now, pay later!</p>
        </div>

        <div>
            <img src="/ecommerce-hero.png" alt=""  style={{width: '600px'}}/>
        </div>
    </section>
  )
}

const style = {
    section : {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px'
    }
}

export default Hero