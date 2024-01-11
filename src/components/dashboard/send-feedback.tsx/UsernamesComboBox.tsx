import { useState } from "react"
import {Control, Controller} from 'react-hook-form'

interface IProps {
    usernames: string[];
    control: Control<any, any>;
    name: string;
    error?: string;
}

const UsernamesComboBox = ({usernames, control, name, error} : IProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [showComboBox, setShowComboBox] = useState<boolean>(false);

    const renderTopRow = () => {
        if (error) {
            return <span className="text-red-600 font-semibold">{error}</span>
        }
        return <label className="font-semibold"></label>
    }
    let usernamesToShow = inputValue ? usernames.filter((q) => q.includes(inputValue)) : usernames;

    const dynamicClassName = error ? 'border-red-500 rounded-lg' : "border-[#754eb477]"

  return (
    <div>В разработке....</div>
  )
}

export default UsernamesComboBox