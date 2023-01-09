import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import bg from "../assets/locust-image2.png";
import locust1 from "../assets/locust1.jpg";
import locust2 from "../assets/locust2.jpg";
import locust3 from "../assets/locust3.jpg";
import Button from '../components/UI/Button';
import Slideshow from '../components/UI/Slideshow';
import bgImage from "../assets/landing page images/bg-shadow.png";
import pic1 from "../assets/landing page images/Picture1.jpg";
import pic2 from "../assets/landing page images/Picture2.jpg";
import pic5 from "../assets/landing page images/Picture5.jpg";
import pic4 from "../assets/landing page images/Picture4.png";
import pic3 from "../assets/landing page images/Picture3.png";
const Index = () => {
    const slides = [
        {
            image: pic1,
            title: "",
            text: "The Desert Locust is one of about a dozen species of short-horned grasshoppers (Acridoidea) that are known to change their behavior and form swarms of adults or bands of hoppers (wingless nymphs).",
            id: 1
        },
        {
            image: pic2,
            title: "",
            text: "The swarms that form can be dense and highly mobile. The Latin name for Desert Locust is Schistocerca gregaria (Forskal). Locusts are part of a large group of insects commonly called grasshoppers which have big hind legs for jumping.",
            id: 2
        },
        {
            image: pic3,
            title: "",
            text: "Locusts belong to the family called Acrididae. Locusts differ from grasshoppers in that they have the ability to change their behavior and habits and can migrate over large distances.",
            id: 3
        },
    ]
  return (
    <div className='relative top-[-50px]'>
        <div className={`w-full max-w-full top-0 h-screen`} style={{backgroundImage: `url(${bgImage})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundColor: 'rgb(164 178 103 / 20%)'}}>
            <div className='flex justify-center relative sm:grid grid-cols-12 h-full w-full bg-clip-padding bg-opacity-30'>
                <div className='absolute top-0 bottom-0 h-fit m-auto p-4 col-start-1 col-span-4'>
                    <h1 className='font-bold mb-7 text-4xl'>Locust Invasion Alerting System</h1>
                    <Link to='/home'><Button>Learn More</Button></Link>
                </div>
            </div>
        </div>
        <Slideshow slides={slides}/>
        <div className={`flex items-center w-full max-w-full h-screen`}>
            <div>
                <h3 className='text-3xl text-center'>Locust Swarm Invasion Areas</h3>
                <p className='p-4'>
                    During quiet periods (known as recessions) Desert Locusts are usually restricted to the semi-arid and arid deserts of Africa, the Near East and South-West Asia that receive less than 200 mm of rain annually. This is an area of about 16 million square KMs, consisting of about 30 countries. During plagues, Desert Locusts may spread over an enormous area of some 29 million square KMs, extending over or into parts of 60 countries. This is more than 20% of the total land surface of the world. During plagues, the Desert Locust has the potential to damage the livelihood of a tenth of the world's population.
                </p>
            </div>
            <img className='w-1/2 h-full object-cover' src={pic3} alt=''/>
        </div>
        <div className={`flex items-center w-full max-w-full h-screen`}>
            <img className='w-1/2 h-full object-cover' src={pic4} alt=''/>
            <div>
                <h3 className='text-3xl text-center'>Desert Locust Biology</h3>
                <p className='p-4'>
                    The lifecycle of the desert locust consists of three stages, the egg, the nymph known as a hopper, and the winged adult. Copulation takes place when a mature male hops onto the back of a mature female and grips her body with his legs. Sperm is transferred from the tip of his abdomen to the tip of hers, where it is stored. The process takes several hours and one insemination is sufficient for a number of batches of eggs.. The egg pod is 3 to 4 cm (1+1⁄8 to 1+5⁄8 in) long and the lower end is about 10 cm (4 in) below the surface of the ground. The eggs are surrounded by foam and this hardens into a membrane and plugs the hole above the egg pod. The eggs absorb moisture from the surrounding soil. The incubation period before the eggs hatch may be two weeks, or much longer, depending on the temperature.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Index;