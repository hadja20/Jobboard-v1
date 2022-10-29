import React, { useState, useEffect } from "react";

import AuthUser from "../AuthUser";


function MessagesJobseeker() {



    const { token, http, user } = AuthUser();
    const [mails, setMails] = useState([])
    const [p, setP] = useState({})

    const getAllMails = async () => {
        await http.get(`/auth/jobseekers/${user.id}/mails`)
            .then(res => {
                const mails = res.data
                setMails(mails)
            })

    }

    useEffect(() => {
        getAllMails();
    }, [])



    return (
        <>

            <div className="title-section"><h3> Ma boîte de réception</h3></div>

            <div className="list-group">
                {mails.map(mail => {
                    return <a href="#" className="list-group-item list-group-item-action " aria-current="true" key={mail.mail_id}>
                        <div className="d-flex w-100 justify-content-between">
                            <p className="mb-1">from: {mail.from}</p>

                        </div>
                        <p className="mb-1">to: {mail.to}</p>
                        <small>{mail.body}</small>
                    </a>



                })}

            </div>

        </>
    )
}

export default MessagesJobseeker;