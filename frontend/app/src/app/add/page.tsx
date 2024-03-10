'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

const AddBookingForm = () => {
    const [service, setService] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [date, setDate] = useState('');
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();
        
     
        const res = await fetch('http://host.docker.internal:5000/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({serivce:service, doctor_name:doctorName, start_time:startTime, end_time:endTime,date:date})
        })

        if (!res.ok) {
            throw new Error('Failed  to insert data');
        }
        router.push('/');
      
     
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="service">
                    Service
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="service" type="text" value={service} onChange={(e) => setService(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="doctorName">
                    Doctor Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="doctorName" type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="startTime">
                    Start Time
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startTime" type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="endTime">
                    End Time
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endTime" type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="date">
                    Date
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Add Booking
                </button>
            </div>
        </form>
    );
};

export default AddBookingForm;
