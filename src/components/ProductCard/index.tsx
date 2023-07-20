import './styles.css'

interface ProductCardProps {
  name: string;
  imageUrl: string;
  imageAlt: string;
}

export default function ProductCard({ name, imageUrl, imageAlt}: ProductCardProps) {
  return (
    <div className='container'>
      <img src={imageUrl} alt={imageAlt} className='image'/>
      <h3 className='name'>{name}</h3>
      
    </div>
  )
}