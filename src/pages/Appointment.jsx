import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
    const { docId } = useParams()
    const { doctors,currencySymbol } = useContext(AppContext)
    const daysofWeek= ['SUN','MON','TUE','WED','THU','FRI','SAT']

    const [docInfo, setDocInfo] = useState(null)
    const [docSlot,setdocSlot]= useState([])
    const [slotIndex,setSoltIndex]= useState(0)
    const [slotTime,setslotTime]=useState('')

    const fetchDocInfo = async () => {
            const docInfo = doctors.find(doc => doc._id === docId);
            setDocInfo(docInfo);
    };

    const getAvailableSlot= async ()=>{
            setdocSlot([])

            let today= new Date()

            for(let i=0; i<7; i++){
                //getting date with index 
                let currDate= new Date(today)
                currDate.setDate(today.getDate()+i)

                //setting end time of the date with index 
                let endTime= new Date
                endTime.setDate(today.getDate()+i)
                endTime.setHours(21,0,0,0)


                //setting hours
                if(today.getDate() === currDate.getDate()){
                    currDate.setHours(currDate.getHours()>10 ? currDate.getHours()+1 : 10)
                    currDate.setMinutes(currDate.getMinutes()>30 ? 30:0)
                }else{
                    currDate.setHours(10)
                    currDate.setMinutes(0)
                }
                let timeSlots=[]

                while(currDate<endTime){
                    let formattedTime=currDate.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})
                    timeSlots.push({
                        dateTime: new Date(currDate),
                        time: formattedTime
                    })

                    // Increament time by 30 minutes
                    currDate.setMinutes(currDate.getMinutes()+30)
                }
                setdocSlot(prev =>([...prev,timeSlots]))
            }
    }

    useEffect(()=>{
        console.log(docSlot)
    },[docSlot ])

    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId]);

    useEffect(() => {
        getAvailableSlot()
    }, [docInfo]);

    return docInfo && (
        <div>
            {/* Doctors Detail */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>
                <div className='flex-1 border border-gray-600 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    {/* docInfo- name,degree and experience */}
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name}
                        <img className='w-5' src={assets.verified_icon} alt="" />
                    </p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='border border-gray-900 p-1.5 text-xs rounded-full'>{docInfo.experience}</button>
                    </div>
                    {/* Doctor about */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                            About <img src={assets.info_icon} alt="" />
                        </p>
                        <p className='text-m text-gray-500 max-w mt-1'>
                            {docInfo.about}
                        </p>
                    </div>
                    <p className='mt-5 text-bold text-m font-medium'>
                     Appointment fee:  {currencySymbol}{docInfo.fees}
                    </p>
                </div>
            </div>

            {/* Booking slot */}
            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking slot</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 '>
                    {
                        docSlot.length && docSlot.map((item,index)=>(
                            <div onClick={()=> setSoltIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white':'border border-gray=200'}`} key={index}>
                                <p>{item[0] && daysofWeek[item[0].dateTime.getDay()]}</p>
                                <p>{item[0] && item[0].dateTime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='flex item-center gap-3 w-full overflow-x-scroll mt-4'>
                    {
                        docSlot.length && docSlot[slotIndex].map((item,index)=>(
                            <p onClick={()=>setslotTime(item.time)} className={`text-sm font-ligth flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                                {item.time.toLowerCase()}
                            </p>
                        ))
                    }
                </div>
                <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
            </div>

            {/* Listing related Doctor */}
                <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
        </div>
    );
};

export default Appointment;
