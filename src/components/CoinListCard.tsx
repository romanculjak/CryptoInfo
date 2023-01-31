import React from 'react'
import {useNavigate} from 'react-router-dom'
import { CoinInfo } from '../pages/Home'


type Props = {
    coin: CoinInfo
}

const CoinListCard = ({coin} : Props) => {

    const navigate = useNavigate();

    const handleClick = ()=>  {
        navigate(`/coin-details/${coin.id}`)
    }


  return (
    <div className='p-4 rounded-lg bg-slate-900 hover:bg-[#02010f] text-white cursor-pointer' onClick={handleClick}>
        <div className='flex justify-between align-middle'>
            <div className='flex gap-4'>
                <img src={coin.image} className='w-8 h-8'/>
                <div>
                    <p>{coin.name}</p>
                </div>  
            </div>

            <div className='bg-slate-800 p-1 rounded-md'>
                <p>{`${new Intl.NumberFormat('en-US', {style:'currency', currency:'USD' }).format(coin.current_price)}`}</p>
            </div>
        </div>
    </div>
  )
}

export default CoinListCard