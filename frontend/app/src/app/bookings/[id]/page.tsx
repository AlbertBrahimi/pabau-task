
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'; 
interface Booking {
    id: string;
    doctor_name: string;
    service: string;
    end_time: string;
    start_time:string;
    date:string;
}

async function getBookings() {
    const res = await fetch('http://host.docker.internal:5000/api/bookings')
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return  res.json();
    
  }

const  Details =  ({ params }: { params: { id: string } }) => {
    const id = String(params.id);
    const [booking, setBooking] = useState<Booking | null>(null);

    useEffect(() => {
        async function fetchBooking() {
            try {
                const fetchedBookings = await getBookings();
                const foundBooking = fetchedBookings.find(b => b.id == id);
                setBooking(foundBooking || null);
            } catch (error) {
                console.error('Error fetching booking:', error);
            }
        }
        console.log(booking);

        fetchBooking();
    }, [id]);


    if (!booking) {
        return (
            <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
                <div>
                    <h1 className="text-xl font-bold text-blue-700">Booking Details</h1>
                    <p className="mt-2 text-gray-500">Booking not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-blue-50 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-blue-500 text-3xl font-bold mb-4">Booking Details</h1>
                <p className="text-blue-700 text-lg">This booking is with
                    <span className="font-semibold mr-2"> {booking.doctor_name}</span> for
                    <span className="font-semibold mx-2">{booking.service}</span> and it ends on
                    <span className="font-semibold ml-2">{booking.end_time}</span>
                </p>
                <Link
                    href="/"
                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Back
                </Link>
            </div>
        </div>
    );
}

export default Details;
