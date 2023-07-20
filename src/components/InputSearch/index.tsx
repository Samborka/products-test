import './styles.css';
interface InputSearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputSearch({ value, onChange }: InputSearchProps) {
  return (
    <div className='input-container'>
      <input
        className='input-search'
        type="text"
        placeholder="BUSQUE AQUI"
        value={value}
        onChange={onChange}
      >
        
      </input>
      <img src="/assets/search.svg" alt="" className="input-image"/>
    </div>
  );
}