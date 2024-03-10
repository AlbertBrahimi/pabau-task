
'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';

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


const Home: React.FC =  () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => { 
    async function fetchBookings() {    
      try{
        const bookings = await  getBookings();
        setBookings(bookings || []);
      }
      catch (error) {
        console.error('Error fetching booking:', error);
      }
    }
    fetchBookings();
  }, []);

  return (
<div className="p-4 flex flex-col items-center justify-center min-h-screen bg-green-100">

  <h1 className="text-2xl font-bold mb-4 text-center text-white bg-blue-500 p-2 rounded">
    Current bookings: {bookings.length}
  </h1>
  <h2>
    <Link href="/add" className="text-white bg-blue-500 p-2 rounded">Add Booking
    </Link>
  </h2>
  <table className="table-auto w-full text-left">
  <thead>
    <tr>
      <th className="px-4 py-2">Date</th>
      <th className="px-4 py-2">Start Time</th>
    </tr>
  </thead>
  <tbody>

{
  bookings.map((booking, id) => (
    <tr key={id} className="border-t">
      <td className="px-4 py-2">
        <Link href={`/bookings/${booking.id}`}>
          <div className="cursor-pointer text-blue-500 hover:underline">                   
           {new Date(booking.date).toLocaleDateString()}</div>
        </Link>
      </td>
      <td className="px-4 py-2">
        <Link href={`/bookings/${booking.id}`}>
          <div className="cursor-pointer text-blue-500 hover:underline">{booking.start_time}</div>
        </Link>
      </td>
    </tr>
  ))
}
  </tbody>
</table>
</div>
  );
};

export default Home;
