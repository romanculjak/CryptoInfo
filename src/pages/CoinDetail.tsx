import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { CoinInfo } from './Home'

type Props = {}

const CoinDetail = (props: Props) => {

    const [coin, setCoin] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const {id} = useParams();

    const navigate = useNavigate();

    const GetBack = ()=> {
        navigate(-1)
    }

    useEffect(() => {
      
        //This is the most simple example of fetching
        const getCoin =async () => {

            setLoading(true);
            
            try
            {

                const result = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);


                const res = await result.json();

                console.log(res)

                setCoin(res)
                
                


            
            }
            catch(err)
            {

                console.log("Something went wrong :( " + err)

            }

            setLoading(false)
            
        }

        getCoin();
      
    }, [])

  return (
    <div className='bg-slate-800 p-4 h-screen text-white'>
        <div>
            <button onClick={GetBack} className='p-4 text-white bg-slate-900 rounded-lg'>{"< Back"}</button>
        </div>
         <div className='mt-4 max-w-2xl rounded-xl bg-slate-900 mx-auto p-4 '>
            <div className='flex gap-4 grow-0 flex-wrap'>
                <img src={coin?.image.large} className='w-16 h-16'/>
                <div className='self-center'>
                    <p className=''>{coin?.name}</p>
                </div>
            </div>

            <div className='flex gap-4 grow-0 flex-wrap mt-4'>
                <div className='bg-slate-800 p-1 rounded-md self-center'>
                    <p>{`${new Intl.NumberFormat('en-US', {style:'currency', currency:'USD' }).format(coin?.market_data.current_price.usd)}`}</p>
                </div>
                <div className='bg-slate-800 p-1 rounded-md self-center'>
                    <p>{`Market cap: ${new Intl.NumberFormat('en-US', {style:'currency', currency:'USD' }).format(coin?.market_data.market_cap.usd)}`}</p>
                </div>

                <div className='bg-slate-800 p-1 rounded-md self-center'>
                    <p>{`Max supply: ${new Intl.NumberFormat('en-US').format(coin?.market_data.max_supply)}`}</p>
                </div>
                <div className='bg-slate-800 p-1 rounded-md self-center'>
                    <p>{`Market cap rank: ${coin?.market_data.market_cap_rank}`}</p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default CoinDetail