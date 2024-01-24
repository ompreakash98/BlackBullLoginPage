import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function CheckOut() {

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString(); // Convert the date to a string
    const checkintime = currentDate.toLocaleTimeString(); // Convert the date to a string
    const [user, setUser] = useState({
        email: '',
        date: date,
        checkintime: '',
        checkOutTime: checkintime
    });

    const navigate = useNavigate()
    // const {storeTokenInLS}=useAuth()

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch('http://localhost:5000/api/employee/checkin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            console.log(response)
            if (response.ok) {

                alert("checkin  Sucessfull");
                const res_data = await response.json();
                console.log("datafrom response", res_data)

                setUser({
                    email: '',
                    date: '',
                    checkintime: '',
                    checkOutTime: ''
                })

            }
            else {
                alert("invalid credential")
                console.log('invalid credential')
            }
        } catch (error) {

        }
        // Handle form submission logic here
        console.log('Submitted user:', user);
    };

    return (
        <>
            <div style={{
                display: "flex", flexDirection: "column", backgroundColor: "black", height: '100vh', justifyContent:
                    "space-evenly", boxShadow: '5px 5px 5px 0px white',
                alignItems: "center"
            }}>


                <form onSubmit={handleSubmit}>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            id='email'
                            value={user.email}
                            onChange={handleInput}
                            required
                            autoCapitalize='off'
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor='date'>date</label>
                        <input
                            type='date'
                            name='date'
                            placeholder='Enter your date'
                            id='date'
                            value={user.date}
                            onChange={handleInput}
                            required
                            autoCapitalize='off'
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor='checkintime'>checkintime</label>
                        <input
                            type='text'
                            name='checkintime'
                            placeholder='Enter your checkintime'
                            id='checkintime'
                            value={user.checkintime}
                            onChange={handleInput}
                            required
                            readOnly
                            autoCapitalize='off'
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor='checkOutTime'>checkOutTime</label>
                        <input
                            type='text'
                            name='checkOutTime'
                            placeholder='Enter your checkOutTime'
                            id='checkOutTime'
                            value={user.checkOutTime}
                            onChange={handleInput}

                            required
                            autoCapitalize='off'
                        />
                    </div>
                    <br />
                    <button type='submit'>checkOut</button>
                </form>

            </div>
        </>

    )
}
