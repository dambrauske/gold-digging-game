import React, {useState} from 'react'
import './App.css'
import Upgrade from "./components/Upgrade.jsx";
import InventoryItem from "./components/InventoryItem.jsx";
import ProgressBar from "./components/ProgressBar.jsx";

const upgrades = [
    {
        price: 50,
        upgrade: '+ 0.3 g to gold dig chance',
    },
    {
        price: 50,
        upgrade: 'Restores 20% energy',
    },
    {
        price: 100,
        upgrade: '+ 1 slot in inventory',
    },
]

function App() {

    const [inventory, setInventory] = useState([])
    const [goldPrice, setGoldPrice] = useState(13)
    const [money, setMoney] = useState(100)
    const [goldLimit, setGoldLimit] = useState(1.0)
    const [inventorySize, setInventorySize] = useState(3)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [energy, setEnergy] = useState(100)


    const generateRandomNumber = (min, max) => {
        const number = Math.random() * (max - min) + min
        return number.toFixed(2)
    }

    const digGold = () => {
        const randomAmount = generateRandomNumber(goldLimit, 0.01)
        if (inventory.length >= inventorySize) {
            setError(true)
            setErrorMessage(`Only ${inventorySize} slots available`)
            return
        }
        setInventory([...inventory, randomAmount])
        setEnergy(energy - generateRandomNumber(1, 10))
        setError(false)

    }

    const formatMoney = (amount) => {
        const formattedAmount = amount.toFixed(2);
        return formattedAmount.replace(/\.00$/, ''); // Remove trailing '.00'
    }

    const handleUpgrades = (upgrade, index) => {
        if (money < upgrade.price) {
            setError(true)
            setErrorMessage(`Not enough money`)
            return
        }


        if (index === 0) {
            console.log(upgrade.price)
            console.log(money)
            setGoldLimit(goldLimit + 0.3)
            setMoney(money - upgrade.price)
            setError(false)

        }

        if (index === 1) {
            if (energy === 100) {
                setError(true)
                setErrorMessage(`Energy already full`)
                return
            }
            console.log(upgrade.price)
            console.log(money)
            setEnergy(energy + (0.2 * energy))
            setMoney(money - upgrade.price)
            setError(false)
        }

        if (index === 2) {
            console.log(upgrade.price)
            console.log(money)
            setInventorySize(inventorySize + 1)
            setMoney(money - upgrade.price)
            setError(false)
        }
    }

    const calculateTotal = () => {
        return inventory.reduce((accumulator, currentValue) => {
            const numericValue = parseFloat(currentValue)
            return accumulator + numericValue;
        }, 0);
    }

    const sellGold = () => {
        const totalGold = calculateTotal()

        if (inventory.length === 0) {
            setError(true)
            setErrorMessage(`No gold in inventory`)
            return
        }
        setMoney(money + (totalGold * goldPrice))
        inventory.length = 0
        setGoldPrice(generateRandomNumber(10, 30))
        setError(false)
    }



    return (
        <div className={"bg-gray-700 h-screen flex flex-col items-center p-4"}>
            <div className={"flex justify-center gap-6"}>
                {upgrades.map((upgrade, i) => (
                    <Upgrade key={i} upgrade={upgrade} onClick={() => handleUpgrades(upgrade, i)}/>
                ))}
            </div>
            <div className={"flex gap-6 p-4 justify-center"}>
                <div className={"bg-gray-600 p-4 flex flex-wrap content-start gap-4 w-96 h-80"}>
                    {inventory.map((item, i) => (
                        <InventoryItem item={item} key={i}/>
                    ))}
                </div>
                <div className={"flex flex-col bg-gray-600 w-96 p-4 justify-between"}>
                    <div className={"flex flex-col gap-4"}>
                        <div>Gold price: {goldPrice}$ per gram</div>
                        <div>Wallet: {formatMoney(money)}$</div>
                    </div>
                    <button
                        onClick={sellGold}
                        className={"bg-green-400 px-4 py-2 rounded w-40"}>Sell all gold</button>
                    <div>
                        <div>Energy level:</div>
                        <ProgressBar energy={energy}/>
                    </div>
                    <button
                        onClick={digGold}
                        className={"bg-orange-400 py-2 rounded w-40"}>Dig gold
                    </button>
                </div>
            </div>
            {error ? <div className={"border border-red-600 py-2 px-4 bg-red-400"}>{errorMessage}</div> : null}
        </div>
    )
}

export default App
