interface BankSelectorProps {
    currentBank: number; // to make the current bank's name visual
    changeBank: () => void; // to set the bank sound 
}

const BankSelector = ({ currentBank, changeBank }: BankSelectorProps) => {
    return (
        <div className="bank-selector">
            <button 
                onClick={changeBank} 
                type="button" 
                style={{ width: "140px" }}
            >
            {currentBank === 1 ? 'Heater Kit' : 'Smooth Piano Kit'}
            </button>
        </div>
    );
}

export default BankSelector;