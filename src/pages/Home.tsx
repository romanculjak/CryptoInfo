import React, {useEffect, useState} from 'react'
import CoinListCard from '../components/CoinListCard'

type Props = {}

export interface CoinInfo {
    id: string,
    name: string,
    image: string,
    current_price: number
}

const Home = (props: Props) => {

    const [coins, setCoins] = useState<CoinInfo[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [toSearch, setToSearch] = useState<string>("")




    useEffect(() => {
      
        //This is the most simple example of fetching
        const getCoins =async () => {

            setLoading(true);
            
            try
            {

                const result = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
                const res = await result.json();

                setCoins(res)
                
            }
            catch(err)
            {

                console.log("Something went wrong :( " + err)

            }

            setLoading(false)
            
        }

        getCoins();
      
    }, [])
    

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>{

        setToSearch(e.target.value)

    }

    const filterCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(toSearch.toLowerCase())
    );


  return (
    <div className='bg-slate-800 min-h-screen p-2'>
        {loading && <div>It is loading...</div>}
        <div className='max-w-xl mx-auto py-8'>
            <h1 className='text-2xl lg:text-8xl text-white text-center'>
                Welcome to <span className='text-transparent  bg-clip-text bg-gradient-to-r from-purple-600 to-yellow-200 font-bold'>CryptoInfo.</span>
            </h1>
        </div>
        <div className='max-w-xl mx-auto my-4 relative'>
            <input onChange={handleSearchInput} placeholder='eg. Bitcoin' className='relative block p-4 px-12 w-full rounded-md border-none outline-none outline-offset-0 focus:outline focus:outline-slate-400 '/>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#b9b9b9" xmlns="http://www.w3.org/2000/svg" className='absolute top-[50%] translate-y-[-50%] left-2 text-gray-100'>
                <path d="M11 20.75C5.62 20.75 1.25 16.38 1.25 11C1.25 5.62 5.62 1.25 11 1.25C16.38 1.25 20.75 5.62 20.75 11C20.75 16.38 16.38 20.75 11 20.75ZM11 2.75C6.45 2.75 2.75 6.45 2.75 11C2.75 15.55 6.45 19.25 11 19.25C15.55 19.25 19.25 15.55 19.25 11C19.25 6.45 15.55 2.75 11 2.75Z" fill="#adadad"/>
                <path d="M20.1601 22.79C20.0801 22.79 20.0001 22.78 19.9301 22.77C19.4601 22.71 18.6101 22.39 18.1301 20.96C17.8801 20.21 17.9701 19.46 18.3801 18.89C18.7901 18.32 19.4801 18 20.2701 18C21.2901 18 22.0901 18.39 22.4501 19.08C22.8101 19.77 22.7101 20.65 22.1401 21.5C21.4301 22.57 20.6601 22.79 20.1601 22.79ZM19.5601 20.49C19.7301 21.01 19.9701 21.27 20.1301 21.29C20.2901 21.31 20.5901 21.12 20.9001 20.67C21.1901 20.24 21.2101 19.93 21.1401 19.79C21.0701 19.65 20.7901 19.5 20.2701 19.5C19.9601 19.5 19.7301 19.6 19.6001 19.77C19.4801 19.94 19.4601 20.2 19.5601 20.49Z" fill="#adadad"/>
            </svg>
        </div>
        <div className='max-w-xl mx-auto'>
            <ul className='flex flex-col gap-2'>
                {
                    filterCoins.map(c=>{ 
                        return(

                            <li key={c.id}>
                                <CoinListCard coin={c}/>
                            </li>

                        )
                    })
                }
            </ul>
        </div>
    </div>
  )
}

export default Home