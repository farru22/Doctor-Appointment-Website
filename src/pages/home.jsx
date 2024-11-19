import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctor from '../components/TopDoctor'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

const home = () => {
  return (
    <div>
        <Header/>
        <SpecialityMenu/>
        <TopDoctor/>
        <Banner/>
    </div>
  )
}

export default home