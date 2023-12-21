import { useState, useEffect } from "react"


export default function Home() {
    const [infos, setInfos] = useState({})
    const [cpus, setCpus] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/os")
            .then(res => res.json())
            .then(data => setInfos(data))

        fetch("http://localhost:3001/os/cpus")
            .then(res => res.json())
            .then(data => setCpus(data))
    }, [])

    return (
        <>
            <ul>
                <li>Hostname : {infos.hostname}</li>
                <li>Plateforme : {infos.platform}</li>
                <li>Type : {infos.type}</li>
                <li>Nombre de coeurs : {cpus.length}</li>
            </ul>

            {cpus.map((cpu) => (
                <p>{cpu.times.user}</p>
            ))}
        </>
    )
}