const Stats = async () => {
    const res = await fetch('https://fortnite-api.com/v2/stats/br/v2')
    const userData = await res.json();
        return (
    <>

    </>
        );
}

export default Stats