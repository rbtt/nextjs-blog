import classes from './hero.module.css'
import Image from 'next/image'

const Hero = (props) => {

    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src='/images/site/rbt.jpg'
                    alt='Image of Artem'
                    width={300}
                    height={300}
                />
            </div>
            <h1>Hi I'm Nikola</h1>
            <p>
                This blog is about web develepment -
                especially about React and NextJS
            </p>
        </section>
    )
}

export default Hero