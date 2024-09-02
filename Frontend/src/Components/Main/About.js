import React from 'react'

const About = () => {
  return (
    <div className='px-44'>
      <p className='text-4xl font-bold text-center underline mt-4'>About HemoCloud</p>
      <br /><p className='text-xl'>HemoCloud works as a platform for users to register as blood to either request/donate blood and blood banks to manage their stocks by managing the pending donations and request and managing them. The system will authenticate the user/bank using their username(mobile) and password to further perform other actions.</p>
      <br /><p className='text-xl'>It includes managing and tracking blood donations, connecting donors with recipients, and providing real-time information on blood shortages and needs. The platform will include both a user-facing interface and an blood bank’s interface for managing the data.</p>
      <p className='text-right text-5xl'>
        <br />
        <a target="_blank" href="https://github.com/hanveshith/" className='hover:drop-shadow-md hover:text-purple'><i class="fa-brands fa-github"></i></a>&nbsp;&nbsp;&nbsp;
        <a target="_blank" href="https://www.linkedin.com/in/hanveshith-juvventhula/" className='hover:drop-shadow-md hover:text-metal'><i class="fa-brands fa-linkedin"></i> </a>&nbsp;&nbsp;
      </p>
    </div>
  )
}

export default About